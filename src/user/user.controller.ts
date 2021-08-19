import { Controller, Delete, Param, Get, Body, Put } from '@nestjs/common';
import { NewUserDayRecipeDataDto, UserDayRecipeDataDto } from './models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) { }

        @Delete('deleteUser/:userId')
        async deleteUser(@Param('userId') userId: string) {
            const response = await this.userService.deleteUser(userId);
            return response;
        }

        @Get('getUserWeek/:userId')
        async getUserWeek(@Param('userId') userId: string) {
            const response = await this.userService.getUserWeek(userId);
            return response;
        }

        @Put('addRecipeToDay/:userId')
        async addRecipeToDay(@Param('userId') userId: string, @Body() userDayRecipe: NewUserDayRecipeDataDto) {
            const response = await this.userService.addRecipeToDay(userId, userDayRecipe);
            return response;
        }

        @Delete('removeRecipeFromDay/:userId')
        async removeRecipeFromDay(@Param('userId') userId: string, @Body() userDayRecipe: UserDayRecipeDataDto) {
            const response = await this.userService.removeRecipeFromDay(userId, userDayRecipe);
            return response;
        }

        @Delete('removeAllRecipesFromWeek/:userId')
        async removeAllRecipesFromWeek(@Param('userId') userId: string) {
            const response = await this.userService.removeAllRecipesFromWeek(userId);
            return response;
        }


}
