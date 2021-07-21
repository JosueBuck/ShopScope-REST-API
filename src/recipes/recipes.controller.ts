import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { INewRecipeDto, IUpdatedRecipeDto } from './models/recipe.model';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {

    constructor(
        private readonly recipesService: RecipesService
    ) { }

    @Post('createRecipe/:userId')
    async createRecipe(@Body() recipeDto: INewRecipeDto, @Param('userId') userId: string) {
        const result = await this.recipesService.createRecipe(recipeDto, userId);
        return result;
    }

    @Post('updateRecipe')
    async updateRecipe(@Body() updateRecipeDto: IUpdatedRecipeDto) {
        const result = await this.recipesService.updateRecipe(updateRecipeDto);
        return result;
    }

    @Get('getSingleRecipe/:id')
    async getSingleRecipe(@Param('id') recipeId: string) {
        const result = await this.recipesService.getSingleRecipe(recipeId);
        return result;
    }

    @Get('getUserRecipes/:userId')
    async getUserRecipes(@Param('userId') userId: string) {
        const result = await this.recipesService.getUserRecipesId(userId);
        return result;
    }

    @Delete('deleteRecipe/:userId/:recipeId')
    async deleteRecipe(@Param('userId') userId: string, @Param('recipeId') recipeId: string) {
        const result = await this.recipesService.deleteRecipe(userId, recipeId);
        return result;
    }
}
