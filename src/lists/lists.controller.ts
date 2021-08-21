import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { ListsService } from './lists.service';
import { NewListItemDto, NewListDto, UpdatedListItemDto, UserListRecipesDto, WeekRecipesIds, UpdatedWeekRecipeIngredient, ListItemDto, IListItem } from './models/list.model';

@Controller('lists')
export class ListsController {

    constructor(
        private listService: ListsService,
    ) {}


    @Post('createList/:userId')
    async createList(@Body() newListDto: NewListDto, @Param('userId') userId: string) {

        const response = await this.listService.createList(newListDto, userId);
        return response;

    }

    @Get('getSimplifiedUserListsInfo/:userId')
    async getSimplifiedUserListsInfo(@Param('userId') userId: string) {

        const response = await this.listService.getSimplifiedUserListsInfo(userId);
        return response;

    }

    @Get('getSingleList/:listId')
    async getSingleList(@Param('listId') listId: string) {

        const response = await this.listService.getSingleList(listId);
        return response;

    }

    @Delete('deleteSingleList/:userId/:listId')
    async deleteSingleList(@Param('userId') userId: string, @Param('listId') listId: string) {

        const response = await this.listService.deleteSingleUserList(userId, listId);
        return response;

    }

    @Post('addWeekRecipesToList/:listId')
    async addWeekRecipesToList(@Param('listId') listId: string, @Body() weekRecipes: UserListRecipesDto) {

        const response = await this.listService.addWeekRecipesToList(listId, weekRecipes.recipes);
        return response;

    }

    @Delete('removeWeekRecipesFromList/:listId')
    async removeWeekRecipesFromList(@Param('listId') listId: string, @Body() recipesIds: WeekRecipesIds) {

        const response = await this.listService.removeWeekRecipeFromList(listId, recipesIds.ids);
        return response;

    }

    @Patch('updateWeekRecipeIngredient/:listId')
    async updateWeekRecipeIngredient(@Param('listId') listId: string, @Body() ingredient: UpdatedWeekRecipeIngredient) {

        const response = await this.listService.updateWeekRecipeIngredient(listId, ingredient);
        return response;

    }


    /* TO-DO: add addNormalRecipesToList -> use a new variable to store added recipes */


    @Post('addListItem/:listId')
    async addListItem(@Param('listId') listId: string, @Body() newListItem: NewListItemDto) {

        const response = await this.listService.addListItem(listId, newListItem);
        return response;

    }

    @Patch('updateListItem')
    async updateListItem(@Body() updatedListItemDto: UpdatedListItemDto) {

        const listId: string = updatedListItemDto.listId;

        const updatedListItem: IListItem = updatedListItemDto.updatedListItem;

        const response = await this.listService.updateListItem(listId, updatedListItem);
        return response;

    }

    @Delete('deleteListItem/:listId/:itemId')
    async deleteListItem(@Param('listId') listId: string, @Param('itemId') itemId: string) {

        const response = await this.listService.deleteListItem(listId, itemId);
        return response;
        
    }


}
