import * as mongoose from 'mongoose';
import { IsString, IsNotEmpty, IsNumber, IsBoolean, ValidateNested, IsArray, IsEnum, ArrayMinSize, IsEmpty, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDayRecipeDto } from 'src/weeks/models/week.model';
import { ApiProperty } from '@nestjs/swagger';


export enum ItemType {

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

export const ListSchema = new mongoose.Schema({

    name: { type: String, required: true},
    description: { type: String, required: true},
    itemTypes: [{ type: String, required: true }],
    weekRecipes: { type: [ { recipeName: String, ingredients: { type: [ { name: String, amount: Number, unit: String, itemType: String, isDone: Boolean } ] } } ] },
    listItems: { type: [ { name: String, amount: Number, unit: String, itemType: String, isDone: Boolean }], required: true},
    itemCounter: { type: Number },
    listPictureUrl: { type: String, required: true}

});

export interface IListMongoose extends mongoose.Document{

    id: string;
    name: string;
    description: string;
    itemTypes: ItemType[];
    weekRecipes: UserDayRecipeDto[];
    listItems: IListItem[];
    itemCounter: number;
    listPictureUrl: string;

};

export interface IList {

    id: string;
    name: string;
    description: string;
    itemTypes: ItemType[];
    weekRecipes: UserDayRecipeDto[];
    listItems: IListItem[];
    itemCounter: number;
    listPictureUrl: string;

};

export interface INewList {

    name: string;
    description: string;
    weekRecipes: UserDayRecipeDto[];
    listItems: INewListItem[];
    itemCounter: number;
    listPictureUrl: string;

};

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
    itemType: string,
    isDone: boolean;

}

export interface INewListItem {

    _id?: string;
    name: string;
    amount: number;
    unit: string;
    itemType: string,
    isDone: boolean;

}

export interface IUserListRecipe {

    _id: string;
    recipeName: string;
    garnish: string;
    ingredients: ListItemDto[];
    recipePictureUrl: string;

}

export class NewListDto {

    @ApiProperty({
        description: 'List name',
        example: 'testList'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Description of the list',
        example: 'This is a test description'
    })
    @IsString()
    description: string;

    @IsArray()
    @ValidateNested()
    @Type(() => UserDayRecipeDto)
    weekRecipes: UserDayRecipeDto[]

    @IsArray()
    @ValidateNested()
    @Type(() => NewListItemDto)
    listItems: NewListItemDto[];

    @ApiProperty({
        description: 'Number of items inside of a list',
        example: 0
    })
    @IsNumber()
    @Max(0)
    itemCounter: number;

    @ApiProperty({
        description: 'Url of the picture which is used for the list.',
        example: 'www.testUrl.com'
    })
    @IsString()
    @IsNotEmpty()
    listPictureUrl: string;

}

export class UpdatedListDto {

    @ApiProperty({
        description: 'List name',
        example: 'testList'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Description of the list',
        example: 'This is a test description'
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Url of the picture which is used for the list.',
        example: 'www.testUrl.com'
    })
    @IsString()
    @IsNotEmpty()
    listPictureUrl: string;

}

export class NewListItemDto {

    @ApiProperty({
        description: 'Ingredient name',
        example: 'testIngredient'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Amount of the specific ingredient',
        example: 1
    })
    @IsNumber()
    amount: number;

    @ApiProperty({
        description: 'The unit regarding the amount',
        example: 'testUnit'
    })
    @IsString()
    unit: string; 

    @ApiProperty({
        description: 'Defines what type of the item',
        example: ItemType.SNACKS
    })
    @IsEnum(ItemType)
    @IsNotEmpty()
    itemType: ItemType;

    @ApiProperty({
        description: 'Holds the information, if the ingredient is already in your shopping cart',
        example: false
    })
    @IsBoolean()
    isDone: boolean;

}

export class ListItemDto {

    @ApiProperty({
        description: 'Ingredient id',
        example: '612cb926a6effb11a4dbb963'
    })
    @IsString()
    @IsNotEmpty()
    _id: string;

    @ApiProperty({
        description: 'Ingredient name',
        example: 'testIngredient'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Amount of the specific ingredient',
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({
        description: 'The unit regarding the amount',
        example: 'testUnit'
    })
    @IsString()
    @IsNotEmpty()
    unit: string;

    @ApiProperty({
        description: 'Defines what type of the item',
        example: ItemType.SNACKS
    })
    @IsEnum(ItemType)
    @IsNotEmpty()
    itemType: ItemType;

    @ApiProperty({
        description: 'Holds the information, if the ingredient is already in your shopping cart',
        example: false
    })
    @IsBoolean()
    @IsNotEmpty()
    isDone: boolean;

}

export class UpdatedListItemDto {

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ListItemDto)
    updatedListItem: ListItemDto;

}

export class UserListRecipesDto {

    @IsArray()
    @ValidateNested()
    @IsNotEmpty()
    @ArrayMinSize(1)
    @Type(() => UserDayRecipeDto)
    recipes: UserDayRecipeDto[];

}

export class WeekRecipesIdsDto {

    @ApiProperty({
        example: ['612cb926a6effb11a4dbb962']
    })
    @IsString({each: true})
    @IsNotEmpty({each: true})
    ids: string[]

}

export class UpdatedWeekRecipeIngredientDto {

    @ApiProperty({
        example: '612cb926a6effb11a4dbb962'
    })
    @IsNotEmpty()
    @IsString()
    recipeId: string;

    @ApiProperty({
        example: '612cb926a6effb11a4dbb963'
    })
    @IsNotEmpty()
    @IsString()
    ingredientId: string;

    @ApiProperty({
        example: true
    })
    @IsNotEmpty()
    @IsBoolean()
    isDone: boolean;

}

export interface IUpdatedWeekRecipeIngredient {

    recipeId: string;
    ingredientId: string;
    isDone: boolean;

}

/* User Lists */

export const UserListsSchema = new mongoose.Schema({

    userId: { type: String, required: true},
    lists: { type: [{ _id: String, listName: String, itemCounter: Number, listPictureUrl: String }]}

})

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