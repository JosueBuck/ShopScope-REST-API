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
    SWEETS = "SWEETS",
    OTHERS = "OTHERS"
}
export declare const ListSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any>;
export interface IListMongoose extends mongoose.Document {
    id: string;
    name: string;
    description: string;
    itemTypes: ItemType[];
    weekRecipes: UserDayRecipeDto[];
    listItems: IListItem[];
    itemCounter: number;
    listPictureUrl: string;
}
export interface IList {
    id: string;
    name: string;
    description: string;
    itemTypes: ItemType[];
    weekRecipes: UserDayRecipeDto[];
    listItems: IListItem[];
    itemCounter: number;
    listPictureUrl: string;
}
export interface INewList {
    name: string;
    description: string;
    weekRecipes: UserDayRecipeDto[];
    listItems: INewListItem[];
    itemCounter: number;
    listPictureUrl: string;
}
export interface IUpdatedList {
    name: string;
    description: string;
    listPictureUrl: string;
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
    garnish: string;
    originalRecipeId: string;
    ingredients: ListItemDto[];
    recipePictureUrl: string;
}
export declare class NewListDto {
    name: string;
    description: string;
    weekRecipes: UserDayRecipeDto[];
    listItems: NewListItemDto[];
    itemCounter: number;
    listPictureUrl: string;
}
export declare class UpdatedListDto {
    name: string;
    description: string;
    listPictureUrl: string;
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
export declare class WeekRecipesIdsDto {
    ids: string[];
}
export declare class UpdatedWeekRecipeIngredientDto {
    recipeId: string;
    ingredientId: string;
    isDone: boolean;
}
export interface IUpdatedWeekRecipeIngredient {
    recipeId: string;
    ingredientId: string;
    isDone: boolean;
}
export declare const UserListsSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, any>;
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
    itemCounter: number;
    listPictureUrl: string;
}
export interface IMongooseIdArray {
    id: string;
}
