import { JwtService } from '@nestjs/jwt';
import { ILoginData } from './models/loginData.model';
import { IRegisterData } from './models/registerData.model';
import { Model } from 'mongoose';
import { IUser } from './models/user.model';
export declare class AuthService {
    private readonly jwtService;
    private readonly userModel;
    constructor(jwtService: JwtService, userModel: Model<IUser>);
    authenticateUser(loginData: ILoginData): Promise<string | false>;
    generateJWT(payload: Object): Promise<string>;
    hashPassword(password: string): Promise<string>;
    comparePasswords(newPassword: string, passwordHash: string): Promise<any | boolean>;
    findUser(username: string): Promise<IUser>;
    registerUser(registerData: IRegisterData): Promise<boolean>;
    deleteUser(username: string): Promise<string>;
}
