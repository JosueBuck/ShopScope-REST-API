import * as mongoose from 'mongoose';
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
export declare class NewRecipeDto {
    name: string;
    recipeType: RecipeType[];
    cookingTime: number;
    description: string;
    ingredients: IngredientDto[];
    instructions: string[];
}
export declare class IngredientDto {
    name: string;
    amount: number;
    unit: string;
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
export interface IRecipe {
    id: string;
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
}
export interface INewRecipe {
    name: string;
    recipeType: RecipeType[];
    cookingTime: number;
    description: string;
    ingredients: IIngredient[];
    instructions: string[];
}
