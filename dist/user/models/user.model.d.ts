import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface IUser {
    id: string;
    username: string;
    password: string;
    email: string;
}
export interface IUserMongoose extends mongoose.Document {
    id: string;
    username: string;
    password: string;
    email: string;
}
export declare const UserRecipesSchema: mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface IUserRecipesMongoose extends mongoose.Document {
    id: string;
    userId: string;
    recipes: string[];
}
export interface IUserRecipes {
    id: string;
    userId: string;
    recipes: string[];
}
export declare const UserListsSchema: mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface IUserListsMongoose extends mongoose.Document {
    id: string;
    userId: string;
    lists: string[];
}
export interface IUserLists {
    id: string;
    userId: string;
    lists: string[];
}
export declare const UserWeekSchema: mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface IUserWeekMongoose extends mongoose.Document {
    id: string;
    userId: string;
    week: IUserDay[];
}
export interface IUserWeek {
    id: string;
    userId: string;
    week: IUserDay[];
}
export interface IUserDay {
    id: string;
    name: string;
    breakfast: IUserDayRecipe[];
    lunch: IUserDayRecipe[];
    dinner: IUserDayRecipe[];
}
export interface IUserDayRecipe {
    id?: string;
    recipeName: string;
    recipeId: string;
}
export interface IUserDayRecipeDataDto {
    dayId: string;
    type: string;
    recipe: IUserDayRecipe;
}
export interface IUserDayRecipeData {
    dayId: string;
    type: string;
    recipe: IUserDayRecipe;
}
