import { ConflictException, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { ListsService } from 'src/lists/lists.service';
import { ISimplifiedList, IUserListsMongoose } from 'src/lists/models/list.model';
import { IResponse } from 'src/models/response.model';
import { ISimplifiedRecipe, IUserRecipesMongoose } from 'src/recipes/models/recipe.model';
import { RecipesService } from 'src/recipes/recipes.service';
import { WeeksService } from 'src/weeks/weeks.service';
import { ILoginData, IRegisterData, IUser, IUserMongoose } from './models/user.model';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
        private readonly recipeService: RecipesService,
        private readonly listsService: ListsService,
        private readonly weeksService: WeeksService,
        private readonly authService: AuthService
    ) { }

    async createNewUser(userRegisterData: IRegisterData): Promise<IUser> {

        const newUser: IUserMongoose = new this.userModel(
            { 
                username: userRegisterData.username,
                password: userRegisterData.password,
                email: userRegisterData.email,
            });

        await this.recipeService.createNewUserRecipeModel(newUser.id);

        await this.listsService.createNewUserListsModel(newUser.id);

        await this.weeksService.createNewUserWeeksModel(newUser.id);
        
            try {
                await newUser.save();
                return newUser;
            } catch {
                throw new RequestTimeoutException();
            }

    }

    async deleteUser(userId: string): Promise<IResponse> {

        await this.findUserById(userId);

        await this.weeksService.getUserWeek(userId);

        const simplifiedUserRecipesObject: IUserRecipesMongoose = await this.recipeService.getSimplifiedUserRecipesByUserId(userId);

        const simplifiedUserListsObject: IUserListsMongoose = await this.listsService.getSimplifiedUserListsByUserId(userId);

        const simplifiedLists: ISimplifiedList[] = simplifiedUserListsObject.lists;

        const simplifiedRecipes: ISimplifiedRecipe[] = simplifiedUserRecipesObject.recipes;
    

        try {
            await this.listsService.deleteManyLists(simplifiedLists);
            await this.recipeService.deleteManyRecipes(simplifiedRecipes);
            await this.listsService.deleteUserListsModel(userId);
            await this.recipeService.deleteUserRecipeModel(userId);
            await this.weeksService.deleteUserWeeksModel(userId);
            await this.userModel.deleteOne({ _id: userId });
        } catch {
            throw new RequestTimeoutException();
        }
        
        return { message: 'Deleted', updatedData: userId, statusCode: 200 };
    }

    async findUserByName(username: string): Promise<IUserMongoose> {

        let user: IUserMongoose;
        
        try {
            user = await this.userModel.findOne({ username: new RegExp('^' + username + '$', "i") });;
        } catch {
            throw new RequestTimeoutException();
        }

        return user;

    }

    async findUserById(userId: string): Promise<IUserMongoose> {

        let user: IUserMongoose;

        try {
            user = await this.userModel.findOne({ _id: userId }).exec();
        } catch {
            throw new NotFoundException('Invalid user id');
        }

        if (!user) {
            throw new NotFoundException('Could not find user');
        }

        return user;
        
    }

    async loginUser(loginData: ILoginData): Promise<IResponse> {

        const user = await this.findUserByName(loginData.username);

        const authenticationResponse = await this.authService.authenticateUser(loginData, user);

        return { message: 'Created', updatedData: authenticationResponse, statusCode: 201 };

    }

    async registerUser(registerData: IRegisterData): Promise<IResponse> {

        const existingUsers: IUser = await this.findUserByName(registerData.username);
        
        if (existingUsers) {
            throw new ConflictException('User with this name already exists');
        }

        const hashedPassword = await this.authService.hashPassword(registerData.password);

        const userRegisterData: IRegisterData = {
            username: registerData.username,
            password: hashedPassword,
            email: registerData.email
        }

        const newUser = await this.createNewUser(userRegisterData);

        return { message: 'Created', updatedData: { username: newUser.username, email: newUser.email, id: newUser.id }, statusCode: 201 }  

    }

}
