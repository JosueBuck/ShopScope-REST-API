import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NewRecipeDto, RecipeTypeDto, UpdatedRecipeDto } from './models/recipe.model';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {

    constructor(
        private readonly recipesService: RecipesService
    ) { }

    @Post('createRecipe/:userId')
    async createRecipe(@Body() recipeDto: NewRecipeDto, @Param('userId') userId: string) {

        const result = await this.recipesService.createRecipe(recipeDto, userId);
        return result;

    }

    @Put('updateRecipe/:userId')
    async updateRecipe(@Param('userId') userId: string, @Body() updateRecipeDto: UpdatedRecipeDto) {

        const result = await this.recipesService.updateRecipe(userId, updateRecipeDto);
        return result;

    }

    @Get('getSimplifiedUserRecipesInfo/:userId')
        async getSimplifiedUserRecipesInfo(@Param('userId') userId: string) {

        const result = await this.recipesService.getSimplifiedUserRecipesInfo(userId);
        return result;

    }

    @Get('getUsersLatestRecipesIds/:userId')
    async getUsersLatestRecipesIds(@Param('userId') userId: string) {

        const response = await this.recipesService.getUsersLatestRecipesIds(userId);
        return response;

    }

    @Get('getSingleRecipe/:recipeId')
    async getSingleRecipe(@Param('recipeId') recipeId: string) {

        const result = await this.recipesService.getSingleRecipe(recipeId);
        return result;

    }

    @Get('getUserRecipesOfRecipeType/:userId')
    async getUserRecipesOfRecipeType(@Param("userId") userId: string, @Body() recipeType: RecipeTypeDto) {

        const result = await this.recipesService.getUserRecipesOfRecipeType(recipeType.recipeType, userId);
        return result;

    }

    @Delete('deleteRecipe/:userId/:recipeId')
    async deleteRecipe(@Param('userId') userId: string, @Param('recipeId') recipeId: string) {

        const result = await this.recipesService.deleteRecipe(userId, recipeId);
        return result;
        
    }
}
