import { Controller, Delete, Param, Get, Patch, Body, Put } from '@nestjs/common';
import { response } from 'express';
import { IUserDayRecipeDataDto } from './models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) { }

    @Delete('deleteUser/:username')
        async deleteUser(@Param('username') username: string) {
            const response = await this.userService.deleteUser(username);
            return response;
        }

    @Get('getUserRecipesIds/:userId')
        async getUserRecipesIds(@Param('userId') userId: string) {
        const result = await this.userService.getUserRecipesIds(userId);
        return result;
    }

        @Get('getUsersLatestRecipesIds/:userId')
        async getUsersLatestRecipesIds(@Param('userId') userId: string) {
            const response = await this.userService.getUsersLatestRecipes(userId);
            return response;
        }

        @Get('getUserLists/:userId')
        async getUserLists(@Param('userId') userId: string) {
            const response = await this.userService.getUserListsIds(userId);
            return response;
        }

        @Get('getUserWeek/:userId')
        async getUserWeek(@Param('userId') userId: string) {
            const response = await this.userService.getUserWeek(userId);
            return response;
        }

        @Put('addRecipeToDay/:userId')
        async addRecipeToDay(@Param('userId') userId: string, @Body() userDayRecipe: IUserDayRecipeDataDto) {
            const response = await this.userService.addRecipeToDay(userId, userDayRecipe);
            return response;
        }

        @Delete('removeRecipeFromDay/:userId')
        async removeRecipeFromDay(@Param('userId') userId: string, @Body() userDayRecipe: IUserDayRecipeDataDto) {
            const response = await this.userService.removeRecipeFromDay(userId, userDayRecipe);
            return response;
        }

        @Delete('removeAllRecipesFromWeek/:userId')
        async removeAllRecipesFromWeek(@Param('userId') userId: string) {
            const response = await this.userService.removeAllRecipesFromWeek(userId);
            return response;
        }


}
