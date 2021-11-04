import * as mongoose from 'mongoose';
import { IsString, IsNotEmpty, ValidateNested, IsArray, ArrayMinSize, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { IListItem, INewListItem, ListItemDto, NewListItemDto } from 'src/lists/models/list.model';
import { ApiProperty } from '@nestjs/swagger';

export const UserWeekSchema = new mongoose.Schema({

    userId: { type: String, required: true},
    week: { type: 
        [ 
            { 
                name: String, 
                breakfast: { type: [ { recipeName: String, garnish: String, originalRecipeId: String, ingredients: { type: [ { name: String, amount: Number, unit: String, itemType: String, isDone: Boolean } ] }, recipePictureUrl: String } ] } ,
                lunch: { type: [ { recipeName: String, garnish: String, originalRecipeId: String, ingredients: { type: [ { name: String, amount: Number, unit: String, itemType: String, isDone: Boolean } ] } , recipePictureUrl: String } ] } ,
                dinner: { type: [ { recipeName: String, garnish: String, originalRecipeId: String, ingredients: { type: [ { name: String, amount: Number, unit: String, itemType: String, isDone: Boolean } ] } , recipePictureUrl: String } ] } ,
            } 
        ] 
    },
    selectedWeekList: { type: String }

});

export interface IUserWeekMongoose extends mongoose.Document {

    id: string;
    userId: string;
    week: IUserDay[];
    selectedWeekList: string;

}

export interface IUserWeek {

    id: string;
    userId: string;
    week: IUserDay[];
    selectedWeekList: string;

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
    garnish: string;
    originalRecipeId: string;
    ingredients: INewListItem[];
    recipePictureUrl: string;

}

export interface IUserDayRecipe {

    _id?: string;
    recipeName: string;
    garnish: string;
    originalRecipeId: string;
    ingredients: IListItem[];
    recipePictureUrl: string;

}

export class NewUserDayRecipeDto {

    @ApiProperty({
        description: 'Recipe name',
        example: 'testRecipe'
    })
    @IsString()
    @IsNotEmpty()
    recipeName: string;

    @ApiProperty({
        description: 'Garnish name',
        example: 'testGarnish'
    })
    @IsString()
    garnish: string;

    @ApiProperty({
        description: 'The id of the original recipe',
        example: '6183e76ab51d7710948d2d64'
    })
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    originalRecipeId: string;

    @IsArray()
    @ValidateNested()
    @IsNotEmpty()
    @ArrayMinSize(1)
    @Type(() => NewListItemDto)
    ingredients: NewListItemDto[];

    @ApiProperty({
        example: 'testUrl'
    })
    @IsString()
    recipePictureUrl: string;

}
export class UserDayRecipeDto {
    
    @ApiProperty({
        description: 'Recipe id',
        example: '612cb926a6effb11a4dbb962'
    })
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    _id: string;

    @ApiProperty({
        description: 'Recipe name',
        example: 'testRecipe'
    })
    @IsString()
    @IsNotEmpty()
    recipeName: string;

    @ApiProperty({
        description: 'Garnish name',
        example: 'testGarnish'
    })
    @IsString()
    garnish: string;

    @ApiProperty({
        description: 'The id of the original recipe',
        example: '6183e76ab51d7710948d2d64'
    })
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    originalRecipeId: string;

    @IsArray()
    @ValidateNested()
    @IsNotEmpty()
    @ArrayMinSize(1)
    @Type(() => ListItemDto)
    ingredients: ListItemDto[];

    @ApiProperty({
        example: 'testUrl'
    })
    @IsString()
    recipePictureUrl: string;

}

export class NewUserDayRecipeDataDto {

    @ApiProperty({
        description: 'Id of a day',
        example: '612caa8c026d490b4b4c8d02'
    })
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    dayId: string;

    @ApiProperty({
        description: 'Defines what type of meal this is',
        example: 'lunch'
    })
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => NewUserDayRecipeDto)
    recipe: NewUserDayRecipeDto;

}

export class UserDayRecipeDataDto {

    @ApiProperty({
        description: 'Id of a day',
        example: '612caa8c026d490b4b4c8d02'
    })
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    dayId: string;

    @ApiProperty({
        description: 'Defines what type of meal this is',
        example: 'lunch'
    })
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UserDayRecipeDto)
    recipe: UserDayRecipeDto;

}