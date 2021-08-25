import * as mongoose from 'mongoose';
import { UserDayRecipeDto } from 'src/weeks/models/week.model';
export declare enum ItemType {
    FRUITS = "FRUITS",
    VEGETABLE = "VEGETABLE",
    BAKEWAREPRODUCTS = "BAKEWAREPRODUCTS",
    CANFOODPRODUCTS = "CANFOODPRODUCTS",
    MEATPRODUCTS = "MEATPRODUCTS",
    MILKPRODUCTS = "MILKPRODUCTS",
    FROZENPRODUCTS = "FROZENPRODUCTS",
    ELECTRICALPRODUCTS = "ELECTRICALPRODUCTS",
    HYGIENEPRODUCTS = "HYGIENEPRODUCTS",
    DRINKS = "DRINKS",
    SNACKS = "SNACKS",
    SWEETS = "SWEETS"
}
export declare const ListSchema: mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface IListMongoose extends mongoose.Document {
    id: string;
    name: string;
    description: string;
    itemTypes: ItemType[];
    weekRecipes: UserDayRecipeDto[];
    listItems: IListItem[];
}
export interface IList {
    id: string;
    name: string;
    description: string;
    itemTypes: ItemType[];
    weekRecipes: UserDayRecipeDto[];
    listItems: IListItem[];
}
export interface INewList {
    name: string;
    description: string;
    weekRecipes: UserDayRecipeDto[];
    listItems: INewListItem[];
}
export interface IListItem {
    _id?: string;
    name: string;
    amount: number;
    unit: string;
    itemType: string;
    isDone: boolean;
}
export interface INewListItem {
    _id?: string;
    name: string;
    amount: number;
    unit: string;
    itemType: string;
    isDone: boolean;
}
export interface IUserListRecipe {
    _id: string;
    recipeName: string;
    ingredients: ListItemDto[];
}
export declare class NewListDto {
    name: string;
    description: string;
    weekRecipes: UserDayRecipeDto[];
    listItems: NewListItemDto[];
}
export declare class NewListItemDto {
    name: string;
    amount: number;
    unit: string;
    itemType: ItemType;
    isDone: boolean;
}
export declare class ListItemDto {
    _id: string;
    name: string;
    amount: number;
    unit: string;
    itemType: ItemType;
    isDone: boolean;
}
export declare class UpdatedListItemDto {
    updatedListItem: ListItemDto;
}
export declare class UserListRecipesDto {
    recipes: UserDayRecipeDto[];
}
export declare class WeekRecipesIds {
    ids: string[];
}
export declare class UpdatedWeekRecipeIngredient {
    recipeId: string;
    ingredientId: string;
    isDone: boolean;
}
export declare const UserListsSchema: mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface IUserListsMongoose extends mongoose.Document {
    id: string;
    userId: string;
    lists: ISimplifiedList[];
}
export interface IUserLists {
    id: string;
    userId: string;
    lists: ISimplifiedList[];
}
export interface ISimplifiedList {
    _id: string;
    listName: string;
}
export interface IMongooseIdArray {
    id: string;
}
