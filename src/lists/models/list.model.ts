import * as mongoose from 'mongoose';
import { IsString, isBoolean, isNumber, IsNotEmpty, isNotEmpty, IsNumber, IsBoolean, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';


export class NewListDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

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

    @IsBoolean()
    isDone: boolean;
}

export class ListItemDto {

    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    unit: string;

    @IsBoolean()
    @IsNotEmpty()
    isDone: boolean;
}

export class UpdatedListItemDto {

    @IsString()
    @IsNotEmpty()
    listId: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ListItemDto)
    updatedListItem: ListItemDto;
}


export const ListSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    listItems: { type: [ { name: String, amount: Number, unit: String, isDone: Boolean }], required: true},
});

export interface IList {
    id: string;
    name: string;
    description: string;
    listItems: IListItem[];
}
export interface INewList {
    name: string;
    description: string;
    listItems: INewListItem[];
}

export interface IListItem {
    id: string;
    name: string;
    amount: number;
    unit: string;
    isDone: boolean;
}

export interface INewListItem {
    name: string;
    amount: number;
    unit: string;
    isDone: boolean;
}

