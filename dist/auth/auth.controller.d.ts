import { AuthService } from './auth.service';
import { ILoginData } from './models/loginData.model';
import { IRegisterData } from './models/registerData.model';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginData: ILoginData): Promise<string | false>;
    register(registerData: IRegisterData): Promise<"register was sucessfull!" | "register was not sucessfull">;
    deleteUser(username: string): Promise<string>;
}
