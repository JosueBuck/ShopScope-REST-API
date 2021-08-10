import * as mongoose from 'mongoose';
export declare class NewListDto {
    name: string;
    description: string;
    listItems: NewListItemDto[];
}
export declare class NewListItemDto {
    name: string;
    amount: number;
    unit: string;
    isDone: boolean;
}
export declare class ListItemDto {
    id: string;
    name: string;
    amount: number;
    unit: string;
    isDone: boolean;
}
export declare class UpdatedListItemDto {
    listId: string;
    updatedListItem: ListItemDto;
}
export declare const ListSchema: mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
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
