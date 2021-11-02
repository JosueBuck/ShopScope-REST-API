import { Controller, Get, Put, Delete, Param, Body, UseGuards, Post } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UserGuard } from 'src/auth/guards/user.auth.guard';
import { AddRecipeToDayResponse, GetUserWeekResponse, IResponse, RemoveAllRecipesFromWeekResponse, RemoveRecipeFromDayResponse } from 'src/models/response.model';
import { NewUserDayRecipeDataDto, UserDayRecipeDataDto } from './models/week.model';
import { WeeksService } from './weeks.service';

@ApiTags('weeks')
@Controller('weeks')
export class WeeksController {

    constructor(
        private readonly weeksService: WeeksService,
    ) { }

        @UseGuards(JwtAuthGuard, UserGuard)
        @Get('getUserWeek/:userId')
        @ApiOkResponse({
            description: 'OK',
            type: GetUserWeekResponse
        })
        @ApiInternalServerErrorResponse({
            description: 'A problem occured while processing the api call'
        })
        @ApiNotFoundResponse({
            description: 'Could not find user week'
        })
        async getUserWeek(@Param('userId') userId: string) {

            const response: IResponse = await this.weeksService.getUserWeek(userId);
            return response;

        }

        @UseGuards(JwtAuthGuard, UserGuard)
        @Post('setSelectedWeekList/:userId/:listId')
        @ApiOkResponse({
            description: 'OK',
            type: GetUserWeekResponse
        })
        @ApiInternalServerErrorResponse({
            description: 'A problem occured while processing the api call'
        })
        @ApiNotFoundResponse({
            description: 'Could not find user week | Could not find list'
        })
        async setSelectedWeekList(@Param('userId') userId: string, @Param('listId') listId: string) {

            const response: IResponse = await this.weeksService.setSelectedWeekList(userId, listId);
            return response;

        }

        @UseGuards(JwtAuthGuard, UserGuard)
        @Put('addRecipeToDay/:userId')
        @ApiOkResponse({
            description: 'OK',
            type: AddRecipeToDayResponse
        })
        @ApiInternalServerErrorResponse({
            description: 'A problem occured while processing the api call'
        })
        @ApiNotFoundResponse({
            description: 'Could not find user week | No day with this id was found'
        })
        async addRecipeToDay(@Param('userId') userId: string, @Body() userDayRecipe: NewUserDayRecipeDataDto) {

            const response: IResponse = await this.weeksService.addRecipeToDay(userId, userDayRecipe);
            return response;

        }

        @UseGuards(JwtAuthGuard, UserGuard)
        @Delete('removeRecipeFromDay/:userId')
        @ApiOkResponse({
            description: 'OK',
            type: RemoveRecipeFromDayResponse
        })
        @ApiInternalServerErrorResponse({
            description: 'A problem occured while processing the api call'
        })
        @ApiNotFoundResponse({
            description: 'Could not find user week | Could not delete recipe'
        })
        async removeRecipeFromDay(@Param('userId') userId: string, @Body() userDayRecipe: UserDayRecipeDataDto) {

            const response: IResponse = await this.weeksService.removeRecipeFromDay(userId, userDayRecipe);
            return response;

        }

        @UseGuards(JwtAuthGuard, UserGuard)
        @Delete('removeAllRecipesFromWeek/:userId')
        @ApiOkResponse({
            description: 'OK',
            type: RemoveAllRecipesFromWeekResponse
        })
        @ApiInternalServerErrorResponse({
            description: 'A problem occured while processing the api call'
        })
        @ApiNotFoundResponse({
            description: 'Could not find user week'
        })
        async removeAllRecipesFromWeek(@Param('userId') userId: string) {

            const response: IResponse = await this.weeksService.removeAllRecipesFromWeek(userId);
            return response;
            
        }

}
