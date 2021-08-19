import { Model } from 'mongoose';
import { IRegisterData } from 'src/auth/models/registerData.model';
import { ListsService } from 'src/lists/lists.service';
import { RecipesService } from 'src/recipes/recipes.service';
import { IUser, IUserMongoose, IUserDayRecipeData, IUserWeek, IUserWeekMongoose, INewUserDayRecipeData } from './models/user.model';
export declare class UserService {
    private readonly userModel;
    private readonly userWeekModel;
    private readonly recipeService;
    private readonly listsService;
    constructor(userModel: Model<IUser>, userWeekModel: Model<IUserWeek>, recipeService: RecipesService, listsService: ListsService);
    createNewUser(userRegisterData: IRegisterData): Promise<IUser & import("mongoose").Document<any, any>>;
    deleteUser(userId: string): Promise<{
        message: string;
        userId: string;
        statusCode: number;
    }>;
    getUserWeek(userId: string): Promise<IUserWeekMongoose>;
    addRecipeToDay(userId: string, userDayRecipe: INewUserDayRecipeData): Promise<{
        message: string;
        userDayRecipe: INewUserDayRecipeData;
        statusCode: number;
    }>;
    removeRecipeFromDay(userId: string, userDayRecipe: IUserDayRecipeData): Promise<{
        message: string;
        userDayRecipe: IUserDayRecipeData;
        statusCode: number;
    }>;
    removeAllRecipesFromWeek(userId: string): Promise<{
        message: string;
        userWeek: IUserWeekMongoose;
        statusCode: number;
    }>;
    findUserByName(username: string): Promise<IUser>;
    findUserById(userId: string): Promise<IUserMongoose>;
    findUserWeekById(userId: string): Promise<IUserWeekMongoose>;
}
