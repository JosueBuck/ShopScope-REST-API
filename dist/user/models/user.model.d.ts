import * as mongoose from 'mongoose';
import { IListItem, INewListItem, ListItemDto, NewListItemDto } from 'src/lists/models/list.model';
export declare const UserSchema: mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface IUserMongoose extends mongoose.Document {
    id: string;
    username: string;
    password: string;
    email: string;
}
export interface IUser {
    id: string;
    username: string;
    password: string;
    email: string;
}
export interface IMongooseIdArray {
    id: string;
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
    _id: string;
    name: string;
    breakfast: IUserDayRecipe[];
    lunch: IUserDayRecipe[];
    dinner: IUserDayRecipe[];
}
export interface INewUserDayRecipeData {
    dayId: string;
    type: string;
    recipe: INewUserDayRecipe;
}
export interface IUserDayRecipeData {
    dayId: string;
    type: string;
    recipe: IUserDayRecipe;
}
export interface INewUserDayRecipe {
    recipeName: string;
    ingredients: INewListItem[];
}
export interface IUserDayRecipe {
    _id?: string;
    recipeName: string;
    ingredients: IListItem[];
}
export declare class NewUserDayRecipeDto {
    recipeName: string;
    ingredients: NewListItemDto[];
}
export declare class UserDayRecipeDto {
    _id: string;
    recipeName: string;
    ingredients: ListItemDto[];
}
export declare class NewUserDayRecipeDataDto {
    dayId: string;
    type: string;
    recipe: NewUserDayRecipeDto;
}
export declare class UserDayRecipeDataDto {
    dayId: string;
    type: string;
    recipe: UserDayRecipeDto;
}
