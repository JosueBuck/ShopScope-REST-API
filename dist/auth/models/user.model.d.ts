import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface IUser {
    id: number;
    username: string;
    password: string;
    email: string;
    lists: string[];
    recipes: string[];
}
