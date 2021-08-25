import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UserGuard } from 'src/auth/guards/user.auth.guard';
import { IResponse } from 'src/models/response.model';

import { ListsService } from './lists.service';
import { NewListItemDto, NewListDto, UpdatedListItemDto, UserListRecipesDto, WeekRecipesIds, UpdatedWeekRecipeIngredient, ListItemDto, IListItem, ISimplifiedList } from './models/list.model';

@ApiTags('lists')
@Controller('lists')
export class ListsController {

    constructor(
        private listService: ListsService,
    ) {}


    @UseGuards(JwtAuthGuard, UserGuard)
    @Post('createList/:userId')
    async createList(@Param('userId') userId: string, @Body() newListDto: NewListDto) {

        const response: IResponse = await this.listService.createList(newListDto, userId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Get('getSimplifiedUserLists/:userId')
    async getSimplifiedUserLists(@Param('userId') userId: string) {

        const response: IResponse = await this.listService.getSimplifiedUserLists(userId);
        return response;

    }

    @UseGuards(JwtAuthGuard)
    @Get('getList/:listId')
    async getList(@Param('listId') listId: string) {

        const response: IResponse = await this.listService.getList(listId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Delete('deleteList/:userId/:listId')
    async deleteList(@Param('userId') userId: string, @Param('listId') listId: string) {

        const response: IResponse = await this.listService.deleteUserList(userId, listId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Post('addWeekRecipesToList/:userId/:listId')
    async addWeekRecipesToList(@Param('userId') userId: string, @Param('listId') listId: string, @Body() weekRecipes: UserListRecipesDto) {

        const response: IResponse = await this.listService.addWeekRecipesToList(listId, weekRecipes.recipes);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Delete('removeWeekRecipesFromList/:userId/:listId')
    async removeWeekRecipesFromList(@Param('userId') userId: string, @Param('listId') listId: string, @Body() recipesIds: WeekRecipesIds) {

        const response: IResponse = await this.listService.removeWeekRecipeFromList(listId, recipesIds.ids);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Patch('updateWeekRecipeIngredientInList/:userId/:listId')
    async updateWeekRecipeIngredientInList(@Param('userId') userId: string, @Param('listId') listId: string, @Body() ingredient: UpdatedWeekRecipeIngredient) {

        const response: IResponse = await this.listService.updateWeekRecipeIngredient(listId, ingredient);
        return response;

    }

    /* TO-DO: add addNormalRecipesToList -> use a new variable to store added recipes */

    @UseGuards(JwtAuthGuard, UserGuard)
    @Post('addListItem/:userId/:listId')
    async addListItem(@Param('userId') userId: string, @Param('listId') listId: string, @Body() newListItem: NewListItemDto) {

        const response: IResponse = await this.listService.addListItem(listId, newListItem);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Patch('updateListItem/:userId/:listId')
    async updateListItem(@Param('userId') userId: string, @Param('listId') listId: string, @Body() updatedListItemDto: UpdatedListItemDto) {

        const updatedListItem: IListItem = updatedListItemDto.updatedListItem;

        const response: IResponse = await this.listService.updateListItem(listId, updatedListItem);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Delete('deleteListItem/:userId/:listId/:itemId')
    async deleteListItem(@Param('userId') userId: string, @Param('listId') listId: string, @Param('itemId') itemId: string) {

        const response: IResponse = await this.listService.deleteListItem(listId, itemId);
        return response;
        
    }


}
