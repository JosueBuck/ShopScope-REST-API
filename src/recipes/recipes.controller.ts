import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UserGuard } from 'src/auth/guards/user.auth.guard';
import { IResponse } from 'src/models/response.model';
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
    async createRecipe(@Param('userId') userId: string, @Body() recipeDto: NewRecipeDto) {

        const response: IResponse = await this.recipesService.createRecipe(recipeDto, userId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Put('updateRecipe/:userId')
    async updateRecipe(@Param('userId') userId: string, @Body() updateRecipeDto: UpdatedRecipeDto) {

        const response: IResponse = await this.recipesService.updateRecipe(userId, updateRecipeDto);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Get('getSimplifiedUserRecipesInfo/:userId')
        async getSimplifiedUserRecipesInfo(@Param('userId') userId: string) {

        const response: IResponse = await this.recipesService.getSimplifiedUserRecipesInfoRequest(userId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Get('getUsersLatestRecipesIds/:userId')
    async getUsersLatestRecipesIds(@Param('userId') userId: string) {

        const response: IResponse = await this.recipesService.getUsersLatestRecipesIds(userId);
        return response;

    }

    @UseGuards(JwtAuthGuard)
    @Get('getSingleRecipe/:recipeId')
    async getSingleRecipe(@Param('recipeId') recipeId: string) {

        const response: IResponse = await this.recipesService.getSingleRecipe(recipeId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Get('getUserRecipesOfRecipeType/:userId')
    async getUserRecipesOfRecipeType(@Param("userId") userId: string, @Body() recipeType: RecipeTypeDto) {

        const response: IResponse = await this.recipesService.getUserRecipesOfRecipeType(recipeType.recipeType, userId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Delete('deleteRecipe/:userId/:recipeId')
    async deleteRecipe(@Param('userId') userId: string, @Param('recipeId') recipeId: string) {

        const response: IResponse = await this.recipesService.deleteRecipe(userId, recipeId);
        return response;
        
    }
}
