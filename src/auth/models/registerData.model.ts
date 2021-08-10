import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDataDto {

    @IsString()
    @IsNotEmpty()
    username: string;  

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export interface IRegisterData {
    username: string,
    password: string,
    email: string,
}