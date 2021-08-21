import * as mongoose from 'mongoose';
import { IsString, IsNotEmpty, ValidateNested, IsArray, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { IListItem, INewListItem, ListItemDto, NewListItemDto } from 'src/lists/models/list.model';

export const UserWeekSchema = new mongoose.Schema({

    userId: { type: String, required: true},
    week: { type: 
        [ 
            { 
                name: String, 
                breakfast: { type: [ { recipeName: String, recipeId: String, ingredients: { type: [ { name: String, amount: Number, unit: String, itemType: String, isDone: Boolean } ] } } ] } ,
                lunch: { type: [ { recipeName: String, recipeId: String, ingredients: { type: [ { name: String, amount: Number, unit: String, itemType: String, isDone: Boolean } ] } } ] } ,
                dinner: { type: [ { recipeName: String, recipeId: String, ingredients: { type: [ { name: String, amount: Number, unit: String, itemType: String, isDone: Boolean } ] } } ] } ,
            } 
        ] 
    }

});

export interface IUserWeekMongoose extends mongoose.Document {

    id: string;
    userId: string;
    week: IUserDay[];

}

export interface IUserWeek {

    id: string;
    userId: string;
    week: IUserDay[];

}

export interface IUserDay {

    _id: string;
    name: string;
    breakfast: IUserDayRecipe[];
    lunch: IUserDayRecipe[];
    dinner: IUserDayRecipe[];

}

export interface INewUserDayRecipeData {

    dayId: string;
    type: string;
    recipe: INewUserDayRecipe;

}

export interface IUserDayRecipeData {

    dayId: string;
    type: string;
    recipe: IUserDayRecipe;

}

export interface INewUserDayRecipe {

    recipeName: string;
    ingredients: INewListItem[];

}

export interface IUserDayRecipe {

    _id?: string;
    recipeName: string;
    ingredients: IListItem[];

}
export class NewUserDayRecipeDto {

    @IsString()
    @IsNotEmpty()
    recipeName: string;

    @IsArray()
    @ValidateNested()
    @IsNotEmpty()
    @ArrayMinSize(1)
    @Type(() => NewListItemDto)
    ingredients: NewListItemDto[];

}
export class UserDayRecipeDto {
    
    @IsString()
    @IsNotEmpty()
    _id: string;

    @IsString()
    @IsNotEmpty()
    recipeName: string;

    @IsArray()
    @ValidateNested()
    @IsNotEmpty()
    @ArrayMinSize(1)
    @Type(() => ListItemDto)
    ingredients: ListItemDto[];

}

export class NewUserDayRecipeDataDto {

    @IsString()
    @IsNotEmpty()
    dayId: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => NewUserDayRecipeDto)
    recipe: NewUserDayRecipeDto;

}

export class UserDayRecipeDataDto {

    @IsString()
    @IsNotEmpty()
    dayId: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UserDayRecipeDto)
    recipe: UserDayRecipeDto;

}