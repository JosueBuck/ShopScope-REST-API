import { AuthService } from './auth.service';
import { LoginDataDto } from './models/loginData.model';
import { RegisterDataDto } from './models/registerData.model';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginData: LoginDataDto): Promise<string>;
    register(registerData: RegisterDataDto): Promise<{
        message: string;
        user: {
            username: string;
            email: string;
            id: string;
        };
        statusCode: number;
    }>;
}
