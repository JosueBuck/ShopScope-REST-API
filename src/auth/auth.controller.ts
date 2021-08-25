import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor() { }

    /* @Post('login')
    async login(@Body() loginData: LoginDataDto) {

        const result = await this.authService.authenticateUser(loginData);
        return result;

    }

    @Post('register')
    async register(@Body() registerData: RegisterDataDto) {

        const response = await this.authService.registerUser(registerData);
        return response;

    } */

    
}
