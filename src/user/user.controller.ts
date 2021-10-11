import { Controller, Delete, Param, Post, Body, UseGuards, Put } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UserGuard } from 'src/auth/guards/user.auth.guard';
import { DeleteUserResponse, IResponse, LoginResponse, RegisterResponse, UpdateUserInformationsResponse } from 'src/models/response.model';
import { LoginDataDto, RegisterDataDto, UpdatedUserDto } from './models/user.model';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('login')
    @ApiCreatedResponse({
        description: 'Created',
        type: LoginResponse,
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Wrong username or password'
    })
    @ApiUnauthorizedResponse({
        description: 'Wrong username or password'
    })
    async login(@Body() loginData: LoginDataDto) {

        const response: IResponse = await this.userService.loginUser(loginData);
        return response;

    }

    /* Add jwt token to response, so the user doesnt need to login again */

    @Post('register')
    @ApiCreatedResponse({
        description: 'Created',
        type: RegisterResponse,
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiConflictResponse({
        description: 'User with this name already exists'
    })
    async register(@Body() registerData: RegisterDataDto) {

        const response: IResponse = await this.userService.registerUser(registerData);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Delete('deleteUser/:userId')
    @ApiOkResponse({
        description: 'OK',
        type: DeleteUserResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid user id | No user with this id.'
    })
    async deleteUser(@Param('userId') userId: string) {

        const response: IResponse = await this.userService.deleteUser(userId);
        return response;
            
    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Put('updateUserInformations/:userId')
    @ApiOkResponse({
        description: 'OK',
        type: UpdateUserInformationsResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid user id | No user with this id.'
    })
    async updateUserInformations(@Param('userId') userId: string, @Body() updatedUser: UpdatedUserDto) {

        const response: IResponse = await this.userService.updateUserInformations(userId, updatedUser);;
        return response;

    }

}
