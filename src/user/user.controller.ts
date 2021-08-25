import { Controller, Delete, Param, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UserGuard } from 'src/auth/guards/user.auth.guard';
import { IResponse } from 'src/models/response.model';
import { LoginDataDto, RegisterDataDto } from './models/user.model';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('login')
    async login(@Body() loginData: LoginDataDto) {

        const response: IResponse = await this.userService.loginUser(loginData);
        return response;

    }

    @Post('register')
    async register(@Body() registerData: RegisterDataDto) {

        const response: IResponse = await this.userService.registerUser(registerData);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Delete('deleteUser/:userId')
    async deleteUser(@Param('userId') userId: string) {

        const response: IResponse = await this.userService.deleteUser(userId);
        return response;
            
    }

}
