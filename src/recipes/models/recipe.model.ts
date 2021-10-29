import * as mongoose from 'mongoose';
import { IsString, IsNumber, IsNotEmpty, IsArray, ValidateNested, ArrayMinSize, IsEnum, ArrayUnique } from 'class-validator';
import { Type } from 'class-transformer';
import { ItemType } from 'src/lists/models/list.model';
import { ApiProperty } from '@nestjs/swagger';

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
    garnish: { type: String, required: true },
    recipeType: [{ type: String, required: true }],
    cookingTime: { type: Number, required: true },
    description: { type: String, required: true },
    ingredients: { type: [ { name: String, amount: Number, unit: String, itemType: String}], required: true },
    instructions: [{ type: String, required: true }],
    recipePictureUrl: { type: String, required: true }

});

export interface IRecipeMongoose extends mongoose.Document {

    id: string;
    name: string;
    garnish: string;
    recipeType: RecipeType[];
    cookingTime: number;
    description: string;
    ingredients: IIngredient[];
    instructions: string[];
    recipePictureUrl: string;

}

export interface IRecipe {

    id: string;
    name: string;
    garnish: string;
    recipeType: RecipeType[];
    cookingTime: number;
    description: string;
    ingredients: IIngredient[];
    instructions: string[];
    recipePictureUrl: string;

}

export interface INewRecipe {

    name: string;
    garnish: string;
    recipeType: RecipeType[];
    cookingTime: number;
    description: string;
    ingredients: IIngredient[];
    instructions: string[];
    recipePictureUrl: string;

}

export interface IIngredient {

    name: string;
    amount: number;
    unit: string;
    itemType: ItemType;

}

export class NewRecipeDto {

    @ApiProperty({
        example: 'testRecipe'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'testGarnish'
    })
    @IsString()
    @IsNotEmpty()
    garnish: string;

    @ApiProperty({
        example: [RecipeType.BREAKFAST, RecipeType.VEGAN]
    })
    @IsEnum(RecipeType, {each: true})
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ArrayUnique()
    recipeType: RecipeType[];

    @ApiProperty({
        example: 30
    })
    @IsNumber()
    @IsNotEmpty()
    cookingTime: number;

    @ApiProperty({
        example: 'This is a test desciption'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ValidateNested()
    @IsNotEmpty()
    @ArrayMinSize(1)
    @Type(() => NewIngredientDto)
    ingredients: NewIngredientDto[];

    @ApiProperty({
        example: ['Instruction 1', 'Instruction 2']
    })
    @IsArray()
    @IsString({each: true})
    @IsNotEmpty()
    @ArrayMinSize(1)
    instructions: string[];

    @ApiProperty({
        example: 'testUrl'
    })
    @IsString()
    @IsNotEmpty()
    recipePictureUrl: string;

}

export class NewIngredientDto {

    @ApiProperty({
        example: 'testIngredient'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 1
    })
    @IsNumber()
    amount: number;

    @ApiProperty({
        example: 'testUnit'
    })
    @IsString()
    unit: string;

    @ApiProperty({
        example: ItemType.SNACKS
    })
    @IsEnum(ItemType)
    @IsNotEmpty()
    itemType: ItemType;

}

export class IngredientDto {

    @ApiProperty({
        description: 'Ingredient id',
        example: 'This is a test description'
    })
    @IsString()
    @IsNotEmpty()
    _id: string;

    @ApiProperty({
        description: 'Ingredient name',
        example: 'updatedIngredientName'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Ingredient amount',
        example: '1'
    })
    @IsNumber()
    amount: number;

    @ApiProperty({
        description: 'Ingredient amount unit',
        example: 'updatedTestUnit'
    })
    @IsString()
    unit: string;

    @ApiProperty({
        description: 'Ingredient type',
        example: ItemType.SNACKS
    })
    itemType: ItemType;

}


export class UpdatedRecipeDto {

    @ApiProperty({
        description: 'Recipe id',
        example: '612d0b3cd963d505785851dd'
    })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({
        description: 'Name of the recipe',
        example: 'updatedTestRecipe'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'testGarnish'
    })
    @IsString()
    garnish: string;

    @ApiProperty({
        description: 'Recipe Type',
        example: RecipeType.FASTFOOD
    })
    @IsEnum(RecipeType, {each: true})
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ArrayUnique()
    recipeType: RecipeType[];

    @ApiProperty({
        description: 'Recipe cooking Time',
        example: 20
    })
    @IsNumber()
    @IsNotEmpty()
    cookingTime: number;

    @ApiProperty({
        description: 'Recipe description',
        example: 'This is a test description'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ValidateNested()
    @IsNotEmpty()
    @ArrayMinSize(1)
    @Type(() => IngredientDto)
    ingredients: IngredientDto[];

    @ApiProperty({
        description: 'Recipe instructions',
        example: ['Updated instruction 1', 'Updated instruction 2']
    })
    @IsArray()
    @IsString({each: true})
    @IsNotEmpty()
    @ArrayMinSize(1)
    instructions: string[];

    @ApiProperty({
        example: 'www.nicepics.com/recipePicture01'
    })
    @IsString()
    @IsNotEmpty()
    recipePictureUrl: string;

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
    recipes: { type: [{ _id: String, recipeName: String, garnish: String, cookingTime: Number,  recipeType: [String], recipePictureUrl: String }] }

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
    garnish: string;
    cookingTime: number;
    recipeType: RecipeType[];
    recipePictureUrl: String;
    
}