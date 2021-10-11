import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UserGuard } from 'src/auth/guards/user.auth.guard';
import { CreateRecipeResponse, DeleteRecipeResponse, GetRecipeResponse, getSimplifiedUserRecipesOfRecipeTypeResponse, GetSimplifiedUserRecipesResponse, IResponse, UpdateRecipeResponse } from 'src/models/response.model';
import { IRecipe, NewRecipeDto, RecipeTypeDto, UpdatedRecipeDto } from './models/recipe.model';
import { RecipesService } from './recipes.service';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {

    constructor(
        private readonly recipesService: RecipesService
    ) { }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Post('createRecipe/:userId')
    @ApiCreatedResponse({
        description: 'Created',
        type: CreateRecipeResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid user id | Could not find user recipes'
    })
    async createRecipe(@Param('userId') userId: string, @Body() recipeDto: NewRecipeDto) {

        const response: IResponse = await this.recipesService.createRecipe(recipeDto, userId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Put('updateRecipe/:userId')
    @ApiOkResponse({
        description: 'OK',
        type: UpdateRecipeResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid user id | Could not find user recipes'
    })
    async updateRecipe(@Param('userId') userId: string, @Body() updateRecipeDto: UpdatedRecipeDto) {

        const response: IResponse = await this.recipesService.updateRecipe(userId, updateRecipeDto);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Get('getSimplifiedUserRecipes/:userId')
    @ApiOkResponse({
        description: 'OK',
        type: GetSimplifiedUserRecipesResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid user id | Could not find user recipes'
    })
        async getSimplifiedUserRecipes(@Param('userId') userId: string) {

        const response: IResponse = await this.recipesService.getSimplifiedUserRecipesRequest(userId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Get('getLatestSimplifiedUserRecipes/:userId')
    @ApiOkResponse({
        description: 'OK',
        type: GetSimplifiedUserRecipesResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid user id | Could not find user recipes'
    })
    async getLatestSimplifiedUserRecipes(@Param('userId') userId: string) {

        const response: IResponse = await this.recipesService.getLatestSimplifiedUserRecipes(userId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Get('getSimplifiedUserRecipesOfRecipeType/:userId')
    @ApiOkResponse({
        description: 'OK',
        type: getSimplifiedUserRecipesOfRecipeTypeResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid user id | Could not find user recipes'
    })
    async getSimplifiedUserRecipesOfRecipeType(@Param("userId") userId: string, @Body() recipeType: RecipeTypeDto) {

        const response: IResponse = await this.recipesService.getSimplifiedUserRecipesOfRecipeType(recipeType.recipeType, userId);
        return response;

    }

    @UseGuards(JwtAuthGuard)
    @Get('getRecipe/:recipeId')
    @ApiOkResponse({
        description: 'OK',
        type: GetRecipeResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid user id | Could not find user recipes'
    })
    async getRecipe(@Param('recipeId') recipeId: string) {

        const response: IResponse = await this.recipesService.getRecipe(recipeId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Delete('deleteRecipe/:userId/:recipeId')
    @ApiOkResponse({
        description: 'Deleted',
        type: DeleteRecipeResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    async deleteRecipe(@Param('userId') userId: string, @Param('recipeId') recipeId: string) {

        const response: IResponse = await this.recipesService.deleteRecipe(userId, recipeId);
        return response;
        
    }
}
