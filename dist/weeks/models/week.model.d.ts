import * as mongoose from 'mongoose';
import { IListItem, INewListItem, ListItemDto, NewListItemDto } from 'src/lists/models/list.model';
export declare const UserWeekSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any>;
export interface IUserWeekMongoose extends mongoose.Document {
    id: string;
    userId: string;
    week: IUserDay[];
    selectedWeekList: string;
}
export interface IUserWeek {
    id: string;
    userId: string;
    week: IUserDay[];
    selectedWeekList: string;
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
    garnish: string;
    originalRecipeId: string;
    ingredients: INewListItem[];
    recipePictureUrl: string;
}
export interface IUserDayRecipe {
    _id?: string;
    recipeName: string;
    garnish: string;
    originalRecipeId: string;
    ingredients: IListItem[];
    recipePictureUrl: string;
}
export declare class NewUserDayRecipeDto {
    recipeName: string;
    garnish: string;
    originalRecipeId: string;
    ingredients: NewListItemDto[];
    recipePictureUrl: string;
}
export declare class UserDayRecipeDto {
    _id: string;
    recipeName: string;
    garnish: string;
    originalRecipeId: string;
    ingredients: ListItemDto[];
    recipePictureUrl: string;
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
