import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDataDto {
    
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export interface ILoginData {

    username: string;
    password: string;
}