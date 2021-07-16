import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ListsService } from './lists.service';
import { IListItemDto, INewListDto } from './models/list.model';

@Controller('lists')
export class ListsController {

    constructor(
        private listService: ListsService,
    ) {}


    @Post('createList')
    async createList(@Body() newListDto: INewListDto) {
        const response = await this.listService.createList(newListDto);
        return response;
    }

    @Get('getSingleList/:listId')
    async getSingleList(@Param('listId') listId: string) {
        const response = await this.listService.getSingleList(listId);
        return response;
    }

    @Delete('deleteSingleList/:listId')
    async deleteSingleList(@Param('listId') listId: string) {
        const response = await this.listService.deleteSingleList(listId);
        return response;
    }

    @Put('addListItem/:listId')
    async addListItem(@Param('listId') listId: string, @Body() newListItem: IListItemDto) {
        const response = await this.listService.addListItem(listId, newListItem);
    }

    @Delete('deleteListItem/:listId/:itemId')
    async deleteListItem(@Param('listId') listId: string, @Param('itemId') itemId: string) {
        const response = await this.listService.deleteListItem(listId, itemId);
        return response;
    }


}
