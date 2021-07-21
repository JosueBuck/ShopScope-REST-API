import { AuthService } from './auth.service';
import { ILoginData } from './models/loginData.model';
import { IRegisterData } from './models/registerData.model';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginData: ILoginData): Promise<string | false>;
    register(registerData: IRegisterData): Promise<false | {
        message: string;
        user: {
            username: string;
            email: string;
        };
        status: number;
    }>;
}
