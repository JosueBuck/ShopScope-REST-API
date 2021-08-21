import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRegisterData } from 'src/auth/models/registerData.model';
import { ListsService } from 'src/lists/lists.service';
import { ISimplifiedList, IUserListsMongoose } from 'src/lists/models/list.model';
import { ISimplifiedRecipe, IUserRecipesMongoose } from 'src/recipes/models/recipe.model';
import { RecipesService } from 'src/recipes/recipes.service';
import { WeeksService } from 'src/weeks/weeks.service';
import { IUser, IUserMongoose } from './models/user.model';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
        private readonly recipeService: RecipesService,
        private readonly listsService: ListsService,
        private readonly weeksService: WeeksService
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

    async deleteUser(userId: string) {

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
        
        return { message: 'Deleted', userId: userId, statusCode: 200 };
    }

    async findUserByName(username: string): Promise<IUser> {

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

}
