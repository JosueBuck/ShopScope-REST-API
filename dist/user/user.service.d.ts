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
    deleteUser(userId: string): Promise<string>;
    getUserWeek(userId: string): Promise<IUserWeekMongoose>;
    addRecipeToDay(userId: string, userDayRecipe: IUserDayRecipeData): Promise<IUserWeekMongoose>;
    removeRecipeFromDay(userId: string, userDayRecipe: IUserDayRecipeData): Promise<IUserWeekMongoose>;
    removeAllRecipesFromWeek(userId: string): Promise<IUserWeekMongoose>;
    addRecipeIdToUser(recipeId: string, userId: string): Promise<void>;
    getUserRecipesIds(userId: string): Promise<string[]>;
    deleteUsersRecipeId(userId: string, recipeId: string): Promise<void>;
    getUsersLatestRecipes(userId: string): Promise<string[]>;
    addListToUser(listId: string, userId: string): Promise<void>;
    getUserListsIds(userId: string): Promise<string[]>;
    findUserByName(username: string): Promise<IUser>;
    findUserById(userId: string): Promise<IUserMongoose>;
    findUserRecipesIdsByUserId(userId: string): Promise<IUserRecipesMongoose>;
    findUserListsById(userId: string): Promise<IUserListsMongoose>;
    findUserWeekById(userId: string): Promise<IUserWeekMongoose>;
    deleteUserList(userId: string, listId: string): Promise<void>;
}
