import * as mongoose from 'mongoose';
import { IsString, IsNumber, IsNotEmpty, IsArray, ValidateNested, ArrayMinSize, IsEnum, ArrayUnique } from 'class-validator';
import { Type } from 'class-transformer';
import { ItemType } from 'src/lists/models/list.model';

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
    ingredients: { type: [ { name: String, amount: Number, unit: String, itemType: String}], required: true },
    instructions: [{ type: String, required: true }]

});

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
    @Type(() => NewIngredientDto)
    ingredients: NewIngredientDto[];

    @IsArray()
    @IsString({each: true})
    @IsNotEmpty()
    @ArrayMinSize(1)
    instructions: string[];

}

export class NewIngredientDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    amount: number;

    @IsString()
    unit: string;

    @IsEnum(ItemType)
    @IsNotEmpty()
    itemType: ItemType;

}

export class IngredientDto {

    @IsString()
    @IsNotEmpty()
    _id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    amount: number;

    @IsString()
    unit: string;

    itemType: ItemType;

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

/* User Recipe */

export const UserRecipesSchema = new mongoose.Schema({

    userId: { type: String, required: true},
    recipes: { type: [{ _id: String, recipeName: String, recipeType: [String] }] }

});

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