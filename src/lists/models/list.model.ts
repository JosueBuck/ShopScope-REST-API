import * as mongoose from 'mongoose';
import { IsString, IsNotEmpty, IsNumber, IsBoolean, ValidateNested, IsArray, IsEnum, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDayRecipeDto } from 'src/weeks/models/week.model';


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

}

export const ListSchema = new mongoose.Schema({

    name: { type: String, required: true},
    description: { type: String, required: true},
    itemTypes: [{ type: String, required: true }],
    weekRecipes: { type: [ { recipeName: String, ingredients: { type: [ { name: String, amount: Number, unit: String, itemType: String, isDone: Boolean } ] } } ] },
    listItems: { type: [ { name: String, amount: Number, unit: String, itemType: String, isDone: Boolean }], required: true},

});

export interface IListMongoose extends mongoose.Document{

    id: string;
    name: string;
    description: string;
    itemTypes: ItemType[];
    weekRecipes: UserDayRecipeDto[];
    listItems: IListItem[];

};

export interface IList {

    id: string;
    name: string;
    description: string;
    itemTypes: ItemType[];
    weekRecipes: UserDayRecipeDto[];
    listItems: IListItem[];

}
export interface INewList {

    name: string;
    description: string;
    weekRecipes: UserDayRecipeDto[];
    listItems: INewListItem[];

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
    ingredients: ListItemDto[];

}

export class NewListDto {

    @IsString()
    @IsNotEmpty()
    name: string;

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

}

export class NewListItemDto {

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

    @IsBoolean()
    isDone: boolean;

}

export class ListItemDto {

    @IsString()
    @IsNotEmpty()
    _id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    unit: string;

    @IsEnum(ItemType)
    @IsNotEmpty()
    itemType: ItemType;

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

export class WeekRecipesIds {

    @IsString({each: true})
    @IsNotEmpty({each: true})
    ids: string[]

}

export class UpdatedWeekRecipeIngredient {

    @IsNotEmpty()
    @IsString()
    recipeId: string;

    @IsNotEmpty()
    @IsString()
    ingredientId: string;

    @IsNotEmpty()
    @IsBoolean()
    isDone: boolean;

}

/* User Lists */

export const UserListsSchema = new mongoose.Schema({

    userId: { type: String, required: true},
    lists: { type: [{ _id: String, listName: String }]}

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

}

export interface IMongooseIdArray {

    id: string;
    
}