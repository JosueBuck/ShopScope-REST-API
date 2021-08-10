import * as mongoose from 'mongoose';
import { IsString, IsNumber, IsNotEmpty, IsArray, ValidateNested, ArrayMinSize, IsEnum, ArrayUnique } from 'class-validator';
import { Type } from 'class-transformer';

export enum RecipeType {

    VEGETARIAN = "VEGETARIAN",
    VEGAN = "VEGAN",
    BREAKFAST = "BREAKFAST",
    FASTFOOD = "FASTFOOD",
    HOMECOOKED = "HOMECOOKED",
    ONEPOT = "ONEPOT",
    DESSERT = "DESSERT",
    DRINKS = "DRINKS"

}

export const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    recipeType: [{ type: String, required: true }],
    cookingTime: { type: Number, required: true },
    description: { type: String, required: true },
    ingredients: { type: [ { _id: false, name: String, amount: Number, unit: String}], required: true },
    instructions: [{ type: String, required: true }]
})

export interface IRecipeMongoose extends mongoose.Document {
    id: string;
    name: string;
    recipeType: RecipeType[];
    cookingTime: number;
    description: string;
    ingredients: IIngredient[];
    instructions: string[];
}

export class NewRecipeDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(RecipeType, {each: true})
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ArrayUnique()
    recipeType: RecipeType[];

    @IsNumber()
    @IsNotEmpty()
    cookingTime: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ValidateNested()
    @IsNotEmpty()
    @ArrayMinSize(2)
    @Type(() => IngredientDto)
    ingredients: IngredientDto[];

    @IsArray()
    @IsString({each: true})
    @IsNotEmpty()
    @ArrayMinSize(1)
    instructions: string[];
}

export class IngredientDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    amount: number;

    @IsString()
    unit: string;
}




export class UpdatedRecipeDto {

    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(RecipeType, {each: true})
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ArrayUnique()
    recipeType: RecipeType[];

    @IsNumber()
    @IsNotEmpty()
    cookingTime: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ValidateNested()
    @IsNotEmpty()
    @ArrayMinSize(2)
    @Type(() => IngredientDto)
    ingredients: IngredientDto[];

    @IsArray()
    @IsString({each: true})
    @IsNotEmpty()
    @ArrayMinSize(1)
    instructions: string[];
}

export class RecipeTypeDto {

    @IsEnum(RecipeType, {each: true})
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ArrayUnique()
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

