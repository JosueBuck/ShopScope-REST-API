import * as mongoose from 'mongoose';

export const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    recipeType: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    description: { type: String, required: true },
    ingredients: { type: [ { _id: false, name: String, amount: Number, unit: String}], required: true },
    instructions: [{ type: String, required: true }]
})

export interface IRecipeMongoose extends mongoose.Document {
    id: string;
    name: string;
    recipeType: string;
    cookingTime: number;
    description: string;
    ingredients: IIngredient[];
    instructions: string[];
}

/* export interface IUpdatedRecipeDto extends mongoose.Document {
    id: string;
    name: string;
    recipeType: string;
    cookingTime: number;
    description: string;
    ingredients: IIngredient[];
    instructions: string[];
} */

export interface IUpdatedRecipeDto {
    id: string;
    name: string;
    recipeType: string;
    cookingTime: number;
    description: string;
    ingredients: IIngredient[];
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
    amoung: number;
    unit: string;
}

export interface INewRecipeDto {
    name: string;
    recipeType: string;
    cookingTime: number;
    description: string;
    ingredients: IIngredient[];
    instructions: string[];
}

export interface INewRecipe {
    name: string;
    recipeType: string;
    cookingTime: number;
    description: string;
    ingredients: IIngredient[];
    instructions: string[];
}

