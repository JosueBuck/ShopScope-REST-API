import * as mongoose from 'mongoose';

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

export interface INewListDto {
    name: string;
    description: string;
    listItems: IListItem[];
}

export interface INewList {
    name: string;
    description: string;
    listItems: IListItem[];
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
    amoung: number;
    unit: string;
    isDone: boolean;
}

export interface IListItemDto {
    name: string;
    amoung: number;
    unit: string;
    isDone: boolean;
}

export interface IUpdatedListItemDto {
    listId: string;
    itemId: string;
    updatedListItem: IListItem;
}