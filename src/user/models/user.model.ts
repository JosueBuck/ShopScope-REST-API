import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({

    username: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true}

})

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