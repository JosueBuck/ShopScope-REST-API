import * as mongoose from 'mongoose';

export const ListSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    listItems: { type: [ { name: String, isDone: Boolean }], required: true},
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
    name: string;
    isDone: boolean;
}

export interface IListItemDto {
    name: string;
    isDone: boolean;
}