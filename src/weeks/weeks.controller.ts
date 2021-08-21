import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { NewUserDayRecipeDataDto, UserDayRecipeDataDto } from './models/week.model';
import { WeeksService } from './weeks.service';

@Controller('weeks')
export class WeeksController {

    constructor(
        private readonly weeksService: WeeksService,
    ) { }

        @Get('getUserWeek/:userId')
        async getUserWeek(@Param('userId') userId: string) {

            const response = await this.weeksService.getUserWeek(userId);
            return response;

        }

        @Put('addRecipeToDay/:userId')
        async addRecipeToDay(@Param('userId') userId: string, @Body() userDayRecipe: NewUserDayRecipeDataDto) {

            const response = await this.weeksService.addRecipeToDay(userId, userDayRecipe);
            return response;

        }

        @Delete('removeRecipeFromDay/:userId')
        async removeRecipeFromDay(@Param('userId') userId: string, @Body() userDayRecipe: UserDayRecipeDataDto) {

            const response = await this.weeksService.removeRecipeFromDay(userId, userDayRecipe);
            return response;

        }

        @Delete('removeAllRecipesFromWeek/:userId')
        async removeAllRecipesFromWeek(@Param('userId') userId: string) {

            const response = await this.weeksService.removeAllRecipesFromWeek(userId);
            return response;
            
        }

}
