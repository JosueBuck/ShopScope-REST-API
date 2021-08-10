import * as mongoose from 'mongoose';
import { IsString, IsNumber, IsNotEmpty, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

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

export class NewRecipeDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    recipeType: string;

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

    @IsString()
    @IsNotEmpty()
    recipeType: string;

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

