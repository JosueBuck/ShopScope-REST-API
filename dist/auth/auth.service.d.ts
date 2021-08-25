import { JwtService } from '@nestjs/jwt';
import { ILoginData, IUserMongoose } from '../user/models/user.model';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    authenticateUser(loginData: ILoginData, user: IUserMongoose): Promise<string>;
    generateJWT(payload: Object): Promise<string>;
    hashPassword(password: string): Promise<string>;
    comparePasswords(newPassword: string, passwordHash: string): Promise<any | boolean>;
}
