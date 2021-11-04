import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { ListsService } from 'src/lists/lists.service';
import { ISimplifiedList, IUserListsMongoose } from 'src/lists/models/list.model';
import { IResponse } from 'src/models/response.model';
import { ISimplifiedRecipe, IUserRecipesMongoose } from 'src/recipes/models/recipe.model';
import { RecipesService } from 'src/recipes/recipes.service';
import { WeeksService } from 'src/weeks/weeks.service';
import { ILoginData, IRegisterData, ISuccessfullLoginData, IUpdatedUser, IUser, IUserMongoose } from './models/user.model';

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
                firstname: userRegisterData.firstname,
                lastname: userRegisterData.lastname,
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
                throw new InternalServerErrorException();
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
            throw new InternalServerErrorException();
        }
        
        return { message: 'Deleted', responseData: userId, statusCode: 200 };
    }

    async findUserByName(username: string): Promise<IUserMongoose> {

        let user: IUserMongoose;
        
        try {
            user = await this.userModel.findOne({ username: new RegExp('^' + username + '$', "i") });;
        } catch {
            throw new InternalServerErrorException('A problem occured while trying to find the user.');
        }

        return user;

    }

    async findUserById(userId: string): Promise<IUserMongoose> {

        let user: IUserMongoose;

        try {
            user = await this.userModel.findOne({ _id: userId }).exec();
        } catch {
            throw new NotFoundException('Invalid user id.');
        }

        if (!user) {
            throw new NotFoundException('No user with this id.');
        }

        return user;
        
    }

    async loginUser(loginData: ILoginData): Promise<IResponse> {

        const user = await this.findUserByName(loginData.username);
        if (!user) {
            throw new NotFoundException('Wrong username or password.');
        }

        const authenticationResponse = await this.authService.authenticateUser(loginData, user);

        user.password = 'xxxx';

        const successfullLoginData: ISuccessfullLoginData = {

            user: user,
            jwt: authenticationResponse

        }

        return { message: 'Created', responseData: successfullLoginData, statusCode: 201 };

    }

    async registerUser(registerData: IRegisterData): Promise<IResponse> {

        const existingUsers: IUser = await this.findUserByName(registerData.username);
        
        if (existingUsers) {
            throw new ConflictException('User with this username already exists.');
        }

        const hashedPassword = await this.authService.hashPassword(registerData.password);

        const userRegisterData: IRegisterData = {
            firstname: registerData.firstname,
            lastname: registerData.lastname,
            username: registerData.username,
            password: hashedPassword,
            email: registerData.email
        }

        const newUser = await this.createNewUser(userRegisterData);
        newUser.password = 'xxxx';

        const userPayloadData = {
            _id: newUser.id,
            firstname: newUser.firstname,
            lastname: newUser.lastname, 
            username: newUser.username,
            email: newUser.email
        }

        const jwt = await this.authService.generateJWT({ userPayloadData });

        return { message: 'Created', responseData: {newUser, jwt}, statusCode: 201 }  

    }

    async updateUserInformations(userId: string, updatedUser: IUpdatedUser): Promise<IResponse> {        

        const user: IUserMongoose = await this.findUserById(userId);
        user.firstname = updatedUser.firstname;
        user.lastname = updatedUser.lastname;
        user.email = updatedUser.email;

        try {
            await user.save();
        } catch {
            throw new InternalServerErrorException('A problem occured while processing the api call');
        }

        user.password = 'xxxx';

        return { message: 'OK', responseData: user, statusCode: 200 }

    }

}
