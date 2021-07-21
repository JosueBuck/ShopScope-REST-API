import * as mongoose from 'mongoose';
export declare const ListSchema: mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
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
