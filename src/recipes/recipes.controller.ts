import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { INewRecipeDto, IUpdatedRecipeDto } from './models/recipe.model';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {

    constructor(
        private readonly recipesService: RecipesService
    ) { }

    @Post('createRecipe')
    async createRecipe(@Body() recipeDto: INewRecipeDto) {
        const result = await this.recipesService.createRecipe(recipeDto);
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

    @Delete('deleteRecipe/:id')
    async deleteRecipe(@Param('id') recipeId: string) {
        const result = await this.recipesService.deleteRecipe(recipeId);
        return result;
    }
}
