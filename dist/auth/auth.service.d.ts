import { JwtService } from '@nestjs/jwt';
import { ILoginData } from './models/loginData.model';
import { IRegisterData } from './models/registerData.model';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    authenticateUser(loginData: ILoginData): Promise<string>;
    generateJWT(payload: Object): Promise<string>;
    hashPassword(password: string): Promise<string>;
    comparePasswords(newPassword: string, passwordHash: string): Promise<any | boolean>;
    registerUser(registerData: IRegisterData): Promise<{
        message: string;
        user: {
            username: string;
            email: string;
            id: string;
        };
        statusCode: number;
    }>;
}
