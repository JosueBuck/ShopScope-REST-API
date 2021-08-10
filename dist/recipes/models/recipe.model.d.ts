import * as mongoose from 'mongoose';
export declare const RecipeSchema: mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface IRecipeMongoose extends mongoose.Document {
    id: string;
    name: string;
    recipeType: string;
    cookingTime: number;
    description: string;
    ingredients: IIngredient[];
    instructions: string[];
}
export declare class NewRecipeDto {
    name: string;
    recipeType: string;
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
    recipeType: string;
    cookingTime: number;
    description: string;
    ingredients: IngredientDto[];
    instructions: string[];
}
export interface IRecipe {
    id: string;
    name: string;
    recipeType: string;
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
    recipeType: string;
    cookingTime: number;
    description: string;
    ingredients: IIngredient[];
    instructions: string[];
}
