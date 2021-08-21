import * as mongoose from 'mongoose';
import { ItemType } from 'src/lists/models/list.model';
export declare enum RecipeType {
    VEGETARIAN = "VEGETARIAN",
    VEGAN = "VEGAN",
    BREAKFAST = "BREAKFAST",
    FASTFOOD = "FASTFOOD",
    HOMECOOKED = "HOMECOOKED",
    ONEPOT = "ONEPOT",
    DESSERT = "DESSERT",
    DRINKS = "DRINKS"
}
export declare const RecipeSchema: mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface IRecipeMongoose extends mongoose.Document {
    id: string;
    name: string;
    recipeType: RecipeType[];
    cookingTime: number;
    description: string;
    ingredients: IIngredient[];
    instructions: string[];
}
export interface IRecipe {
    id: string;
    name: string;
    recipeType: RecipeType[];
    cookingTime: number;
    description: string;
    ingredients: IIngredient[];
    instructions: string[];
}
export interface INewRecipe {
    name: string;
    recipeType: RecipeType[];
    cookingTime: number;
    description: string;
    ingredients: IIngredient[];
    instructions: string[];
}
export interface IIngredient {
    name: string;
    amount: number;
    unit: string;
    itemType: ItemType;
}
export declare class NewRecipeDto {
    name: string;
    recipeType: RecipeType[];
    cookingTime: number;
    description: string;
    ingredients: NewIngredientDto[];
    instructions: string[];
}
export declare class NewIngredientDto {
    name: string;
    amount: number;
    unit: string;
    itemType: ItemType;
}
export declare class IngredientDto {
    _id: string;
    name: string;
    amount: number;
    unit: string;
    itemType: ItemType;
}
export declare class UpdatedRecipeDto {
    id: string;
    name: string;
    recipeType: RecipeType[];
    cookingTime: number;
    description: string;
    ingredients: IngredientDto[];
    instructions: string[];
}
export declare class RecipeTypeDto {
    recipeType: RecipeType[];
}
export declare const UserRecipesSchema: mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface IUserRecipesMongoose extends mongoose.Document {
    id: string;
    userId: string;
    recipes: ISimplifiedRecipe[];
}
export interface IUserRecipes {
    id: string;
    userId: string;
    recipes: ISimplifiedRecipe[];
}
export interface ISimplifiedRecipe {
    _id: string;
    recipeName: string;
    recipeType: RecipeType[];
}
