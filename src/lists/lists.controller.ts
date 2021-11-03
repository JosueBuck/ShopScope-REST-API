import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UserGuard } from 'src/auth/guards/user.auth.guard';
import { AddListItemResponse, AddWeekRecipesToList, CreateListResponse, DeleteListItemResponse, DeleteListResponse, GetListResponse, GetSimplifiedUserListsResponse, IResponse, RemoveWeekRecipeFromListResponse, UpdateListItemResponse, UpdateWeekRecipeIngredientInList } from 'src/models/response.model';

import { ListsService } from './lists.service';
import { NewListItemDto, NewListDto, UpdatedListItemDto, UserListRecipesDto, WeekRecipesIdsDto, ListItemDto, IListItem, ISimplifiedList, UpdatedWeekRecipeIngredientDto, UpdatedListDto } from './models/list.model';

@ApiTags('lists')
@Controller('lists')
export class ListsController {

    constructor(
        private listService: ListsService,
    ) {}


    @UseGuards(JwtAuthGuard, UserGuard)
    @Post('createList/:userId')
    @ApiCreatedResponse({
        description: 'Created',
        type: CreateListResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid user id | Could not find user lists'
    })
    async createList(@Param('userId') userId: string, @Body() newListDto: NewListDto) {

        const response: IResponse = await this.listService.createList(newListDto, userId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Delete('clearList/:userId/:listId')
    @ApiCreatedResponse({
        description: 'Deleted',
        type: CreateListResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid user id | Could not find list'
    })
    async clearList(@Param('userId') userId: string, @Param('listId') listId: string) {

        const response: IResponse = await this.listService.clearList(userId, listId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Post('updateListSettings/:userId/:listId')
    @ApiCreatedResponse({
        description: 'OK',
        type: CreateListResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid user id | Could not find list'
    })
    async updateListSettings(@Param('userId') userId: string, @Param('listId') listId: string, @Body() updatedListDto: UpdatedListDto) {

        const response: IResponse = await this.listService.updateListSettings(updatedListDto, listId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Get('getSimplifiedUserLists/:userId')
    @ApiOkResponse({
        description: 'OK',
        type: GetSimplifiedUserListsResponse
    })
    @ApiNotFoundResponse({
        description: 'Invalid user id | Could not find user lists'
    })
    async getSimplifiedUserLists(@Param('userId') userId: string) {

        const response: IResponse = await this.listService.getSimplifiedUserLists(userId);
        return response;

    }

    @UseGuards(JwtAuthGuard)
    @Get('getList/:listId')
    @ApiOkResponse({
        description: 'OK',
        type: GetListResponse
    })
    @ApiNotFoundResponse({
        description: 'Invalid list id | No list with this id was found'
    })
    async getList(@Param('listId') listId: string) {

        const response: IResponse = await this.listService.getList(listId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Delete('deleteList/:userId/:listId')
    @ApiOkResponse({
        description: 'OK',
        type: DeleteListResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid user id | Invalid list id | Could not find user lists | No list with this id was found'
    })
    async deleteList(@Param('userId') userId: string, @Param('listId') listId: string) {

        const response: IResponse = await this.listService.deleteUserList(userId, listId);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Post('addWeekRecipesToList/:userId/:listId')
    @ApiCreatedResponse({
        description: 'Created',
        type: AddWeekRecipesToList
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid list id | No list with this id was found'
    })
    async addWeekRecipesToList(@Param('userId') userId: string, @Param('listId') listId: string, @Body() weekRecipes: UserListRecipesDto) {

        const response: IResponse = await this.listService.addWeekRecipesToList(userId, listId, weekRecipes.recipes);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Delete('removeWeekRecipesFromList/:userId/:listId')
    @ApiOkResponse({
        description: 'OK',
        type: RemoveWeekRecipeFromListResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid list id | No list with this id was found'
    })
    async removeWeekRecipesFromList(@Param('userId') userId: string, @Param('listId') listId: string, @Body() recipesIds: WeekRecipesIdsDto) {

        const response: IResponse = await this.listService.removeWeekRecipeFromList(userId, listId, recipesIds.ids);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Patch('updateWeekRecipeIngredientInList/:userId/:listId')
    @ApiOkResponse({
        description: 'OK',
        type: UpdateWeekRecipeIngredientInList
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid list id | No list with this id was found'
    })
    async updateWeekRecipeIngredientInList(@Param('userId') userId: string, @Param('listId') listId: string, @Body() ingredient: UpdatedWeekRecipeIngredientDto) {

        const response: IResponse = await this.listService.updateWeekRecipeIngredient(listId, ingredient);
        return response;

    }

    /* TO-DO: add addNormalRecipesToList -> use a new variable to store added recipes */

    @UseGuards(JwtAuthGuard, UserGuard)
    @Post('addListItem/:userId/:listId')
    @ApiCreatedResponse({
        description: 'Created',
        type: AddListItemResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid list id | No list with this id was found'
    })
    async addListItem(@Param('userId') userId: string, @Param('listId') listId: string, @Body() newListItem: NewListItemDto) {

        const response: IResponse = await this.listService.addListItem(userId, listId, newListItem);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Patch('updateListItem/:userId/:listId')
    @ApiOkResponse({
        description: 'Created',
        type: UpdateListItemResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid list id | No list with this id was found'
    })
    async updateListItem(@Param('userId') userId: string, @Param('listId') listId: string, @Body() updatedListItemDto: UpdatedListItemDto) {

        const updatedListItem: IListItem = updatedListItemDto.updatedListItem;

        const response: IResponse = await this.listService.updateListItem(listId, updatedListItem);
        return response;

    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Delete('deleteListItem/:userId/:listId/:itemId')
    @ApiOkResponse({
        description: 'Created',
        type: DeleteListItemResponse
    })
    @ApiInternalServerErrorResponse({
        description: 'A problem occured while processing the api call'
    })
    @ApiNotFoundResponse({
        description: 'Invalid list id | No list with this id was found'
    })
    async deleteListItem(@Param('userId') userId: string, @Param('listId') listId: string, @Param('itemId') itemId: string) {

        const response: IResponse = await this.listService.deleteListItem(userId, listId, itemId);
        return response;
        
    }

}
