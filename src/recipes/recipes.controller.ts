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
    @Get('getSimplifiedUserRecipes/:userId')
        async getSimplifiedUserRecipes(@Param('userId') userId: string) {

        const response: IResponse = await this.recipesService.getSimplifiedUserRecipesRequest(userId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Get('getLatestSimplifiedUserRecipes/:userId')
    async getLatestSimplifiedUserRecipes(@Param('userId') userId: string) {

        const response: IResponse = await this.recipesService.getLatestSimplifiedUserRecipes(userId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Get('getSimplifiedUserRecipesOfRecipeType/:userId')
    async getSimplifiedUserRecipesOfRecipeType(@Param("userId") userId: string, @Body() recipeType: RecipeTypeDto) {

        const response: IResponse = await this.recipesService.getSimplifiedUserRecipesOfRecipeType(recipeType.recipeType, userId);
        return response;

    }

    @UseGuards(JwtAuthGuard)
    @Get('getRecipe/:recipeId')
    async getRecipe(@Param('recipeId') recipeId: string) {

        const response: IResponse = await this.recipesService.getRecipe(recipeId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Delete('deleteRecipe/:userId/:recipeId')
    async deleteRecipe(@Param('userId') userId: string, @Param('recipeId') recipeId: string) {

        const response: IResponse = await this.recipesService.deleteRecipe(userId, recipeId);
        return response;
        
    }
}
