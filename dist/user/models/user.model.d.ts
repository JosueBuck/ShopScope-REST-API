import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<mongoose.Document<any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface IUserMongoose extends mongoose.Document {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
}
export interface IUser {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
}
export interface IMongooseIdArray {
    id: string;
}
export declare class LoginDataDto {
    username: string;
    password: string;
}
export interface ILoginData {
    username: string;
    password: string;
}
export interface ISuccessfullLoginData {
    user: IUser;
    jwt: string;
}
export declare class RegisterDataDto {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
}
export interface IRegisterData {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
}
export declare class UpdatedUserDto {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
}
export interface IUpdatedUser {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
}
