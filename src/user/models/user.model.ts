import * as mongoose from 'mongoose';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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


/* Login Data */

export class LoginDataDto {
    
    @ApiProperty({
        description: 'Name of a user'
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'Password of a user' 
    })
    @IsString()
    @IsNotEmpty()
    password: string;

}

export interface ILoginData {

    username: string;
    password: string;

}

/* Register Data */

export class RegisterDataDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;  

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

}

export interface IRegisterData {
    username: string,
    password: string,
    email: string,
}