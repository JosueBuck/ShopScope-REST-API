import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ILoginData } from './models/loginData.model';
import { IRegisterData } from './models/registerData.model';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() loginData: ILoginData) {
        const result = await this.authService.authenticateUser(loginData);
        return result;
    }

    @Post('register')
    async register(@Body() registerData: IRegisterData) {
        const response = await this.authService.registerUser(registerData);
        return response;
        
    }

    
}
