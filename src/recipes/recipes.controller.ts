import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NewRecipeDto, UpdatedRecipeDto } from './models/recipe.model';
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

    @Put('updateRecipe')
    async updateRecipe(@Body() updateRecipeDto: UpdatedRecipeDto) {
        const result = await this.recipesService.updateRecipe(updateRecipeDto);
        return result;
    }

    @Get('getSingleRecipe/:recipeId')
    async getSingleRecipe(@Param('recipeId') recipeId: string) {
        const result = await this.recipesService.getSingleRecipe(recipeId);
        return result;
    }

    @Delete('deleteRecipe/:userId/:recipeId')
    async deleteRecipe(@Param('userId') userId: string, @Param('recipeId') recipeId: string) {
        const result = await this.recipesService.deleteRecipe(userId, recipeId);
        return result;
    }
}
