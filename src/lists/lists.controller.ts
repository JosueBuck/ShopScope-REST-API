import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ListsService } from './lists.service';
import { IListItemDto, INewListDto, IUpdatedListItemDto } from './models/list.model';

@Controller('lists')
export class ListsController {

    constructor(
        private listService: ListsService,
    ) {}


    @Post('createList/:userId')
    async createList(@Body() newListDto: INewListDto, @Param('userId') userId: string) {
        const response = await this.listService.createList(newListDto, userId);
        return response;
    }

    @Get('getSingleList/:listId')
    async getSingleList(@Param('listId') listId: string) {
        const response = await this.listService.getSingleList(listId);
        return response;
    }

    @Delete('deleteSingleList/:userId/:listId')
    async deleteSingleList(@Param('userId') userId: string, @Param('listId') listId: string) {
        const response = await this.listService.deleteSingleList(userId, listId);
        return response;
    }

    @Put('addListItem/:listId')
    async addListItem(@Param('listId') listId: string, @Body() newListItem: IListItemDto) {
        const response = await this.listService.addListItem(listId, newListItem);
        return response;
    }

    @Patch('updateListItem')
    async updateListItem(@Body() updatedListItemDto: IUpdatedListItemDto) {
        const listId = updatedListItemDto.listId;
        const updatedListItem = updatedListItemDto.updatedListItem;
        const itemId = updatedListItem.id;
        
        const response = await this.listService.updateListItem(listId, itemId, updatedListItem);
        return response;
    }

    @Delete('deleteListItem/:listId/:itemId')
    async deleteListItem(@Param('listId') listId: string, @Param('itemId') itemId: string) {
        const response = await this.listService.deleteListItem(listId, itemId);
        return response;
    }


}
