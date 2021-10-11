import * as mongoose from 'mongoose';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const UserSchema = new mongoose.Schema({

    firstname: { type: String, requeired: true },
    lastname: { type: String, requeired: true },
    username: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true}

})

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


/* Login Data */

export class LoginDataDto {
    
    @ApiProperty({
        description: 'Name of a user',
        example: 'TestUser'
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'Password of a user' ,
        example: 'TestPassword'
    })
    @IsString()
    @IsNotEmpty()
    password: string;

}

export interface ILoginData {

    username: string;
    password: string;

}

export interface ISuccessfullLoginData {

    user: IUser,
    jwt: string

}

/* Register Data */

export class RegisterDataDto {

    @ApiProperty({
        description: 'First name of a user',
        example: 'Hans'
    })
    @IsString()
    @IsNotEmpty()
    firstname: string;  

    @ApiProperty({
        description: 'Last name of a user',
        example: 'Müller'
    })
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty({
        description: 'Name of a user',
        example: 'TestUser'
    })
    @IsString()
    @IsNotEmpty()
    username: string;  

    @ApiProperty({
        description: 'Password of a user',
        example: 'TestPassword'
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'Email of a user',
        example: 'testUser@mail.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

}

export interface IRegisterData {

    firstname: string;
    lastname: string;
    username: string,
    password: string,
    email: string,

}

/* Update Data */

export class UpdatedUserDto {

    @ApiProperty({
        description: 'Id of a user',
        example: '612caa8c026d490b4b4c8cfc'
    })
    @IsString()
    @IsNotEmpty()
    _id: string; 

    @ApiProperty({
        description: 'First name of a user',
        example: 'Hans'
    })
    @IsString()
    @IsNotEmpty()
    firstname: string;  

    @ApiProperty({
        description: 'Last name of a user',
        example: 'Müller'
    })
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty({
        description: 'Name of a user',
        example: 'TestUser'
    })
    @IsString()
    @IsNotEmpty()
    username: string;  

    @ApiProperty({
        description: 'Password of a user',
        example: 'TestPassword'
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'Email of a user',
        example: 'testUser@mail.com'
    })
    @IsEmail()
    @IsNotEmpty()
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