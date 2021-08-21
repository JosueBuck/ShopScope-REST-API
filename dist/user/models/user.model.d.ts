import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface IUserMongoose extends mongoose.Document {
    id: string;
    username: string;
    password: string;
    email: string;
}
export interface IUser {
    id: string;
    username: string;
    password: string;
    email: string;
}
export interface IMongooseIdArray {
    id: string;
}
