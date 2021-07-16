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
    name: string;
    isDone: boolean;
}
export interface IListItemDto {
    name: string;
    isDone: boolean;
}
