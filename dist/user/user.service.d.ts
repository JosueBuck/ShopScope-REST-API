import { Model } from 'mongoose';
import { IRegisterData } from 'src/auth/models/registerData.model';
import { IUser, IUserMongoose, IUserRecipes, IUserRecipesMongoose, IUserLists, IUserListsMongoose, IUserDayRecipeData, IUserWeek, IUserWeekMongoose } from './models/user.model';
export declare class UserService {
    private readonly userModel;
    private readonly userRecipesModel;
    private readonly userListsModel;
    private readonly userWeekModel;
    constructor(userModel: Model<IUser>, userRecipesModel: Model<IUserRecipes>, userListsModel: Model<IUserLists>, userWeekModel: Model<IUserWeek>);
    createNewUser(userRegisterData: IRegisterData): Promise<IUser & import("mongoose").Document<any, any>>;
    deleteUser(userId: string): Promise<{
        message: string;
        userId: string;
        statusCode: number;
    }>;
    getUserWeek(userId: string): Promise<IUserWeekMongoose>;
    addRecipeToDay(userId: string, userDayRecipe: IUserDayRecipeData): Promise<{
        message: string;
        userDayRecipe: IUserDayRecipeData;
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
    addRecipeIdToUser(recipeId: string, userId: string): Promise<void>;
    getUserRecipesIds(userId: string): Promise<string[]>;
    deleteUsersRecipeId(userId: string, recipeId: string): Promise<void>;
    deleteUserListId(userId: string, listId: string): Promise<void>;
    getUsersLatestRecipes(userId: string): Promise<string[]>;
    addListIdToUser(listId: string, userId: string): Promise<void>;
    getUserListsIds(userId: string): Promise<string[]>;
    findUserByName(username: string): Promise<IUser>;
    findUserById(userId: string): Promise<IUserMongoose>;
    findUserRecipesIdsByUserId(userId: string): Promise<IUserRecipesMongoose>;
    findUserListsIdsByUserId(userId: string): Promise<IUserListsMongoose>;
    findUserWeekById(userId: string): Promise<IUserWeekMongoose>;
}
