import { Controller, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UserGuard } from 'src/auth/guards/user.auth.guard';
import { NewListItemDto } from 'src/lists/models/list.model';
import { IResponse } from 'src/models/response.model';
import { IUserWeek, NewUserDayRecipeDataDto, UserDayRecipeDataDto } from './models/week.model';
import { WeeksService } from './weeks.service';

@ApiTags('weeks')
@Controller('weeks')
export class WeeksController {

    constructor(
        private readonly weeksService: WeeksService,
    ) { }

        @UseGuards(JwtAuthGuard, UserGuard)
        @Get('getUserWeek/:userId')
        async getUserWeek(@Param('userId') userId: string) {

            const response: IResponse = await this.weeksService.getUserWeek(userId);
            return response;

        }

        @UseGuards(JwtAuthGuard, UserGuard)
        @Put('addRecipeToDay/:userId')
        async addRecipeToDay(@Param('userId') userId: string, @Body() userDayRecipe: NewUserDayRecipeDataDto) {

            const response: IResponse = await this.weeksService.addRecipeToDay(userId, userDayRecipe);
            return response;

        }

        @UseGuards(JwtAuthGuard, UserGuard)
        @Delete('removeRecipeFromDay/:userId')
        async removeRecipeFromDay(@Param('userId') userId: string, @Body() userDayRecipe: UserDayRecipeDataDto) {

            const response: IResponse = await this.weeksService.removeRecipeFromDay(userId, userDayRecipe);
            return response;

        }

        @UseGuards(JwtAuthGuard, UserGuard)
        @Delete('removeAllRecipesFromWeek/:userId')
        async removeAllRecipesFromWeek(@Param('userId') userId: string) {

            const response: IResponse = await this.weeksService.removeAllRecipesFromWeek(userId);
            return response;
            
        }

}
