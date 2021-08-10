import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { IList, IListItem, INewList, INewListItem } from './models/list.model';

@Injectable()
export class ListsService {

    constructor(
        private readonly userService: UserService,
        @InjectModel('List') private readonly listModel: Model<IList>
    ) { }

    async createList(list: INewList, userId: string) {
        let newList = new this.listModel(
            {
                name: list.name,
                description: list.description,
                listItems: list.listItems,
            }
        );
        
        await this.userService.addListIdToUser(newList.id, userId)

        try {
            await newList.save();
        } catch {
            throw new RequestTimeoutException();
        }
        
        return { message: "Created", listId: newList.id, userId: userId, status: 201 };

    }

    async getSingleList(listId: string) {
        const list = await this.findListById(listId);
        return {
            id: list.id,
            name: list.name,
            description: list.description,
            listItems: list.listItems
        }
    }

    async findListById(listId: string) {
        let list;
        try {
            list = await this.listModel.findById(listId).exec();
        } catch {
            throw new NotFoundException('Invalid list id');
        }

        if (!list) {
            throw new NotFoundException('No list with this id was found!');
        }
        return list;
    }

    async addListItem(listId: string, listItem: INewListItem) {
        let list = await this.findListById(listId);
        list.listItems.push(listItem);

        try {
            list.save();
        } catch {
            throw new RequestTimeoutException();
        }

        return { message: "Created", listItem: listItem, statusCode: 201 }
        
    }

    async updateListItem(listId: string, updatedListItem: IListItem) {
        let list = await this.findListById(listId);
        const index = list.listItems.findIndex((listItem: IListItem) => listItem.id === updatedListItem.id);
        if (index == -1) {
            throw new NotFoundException('No list item with this id was found!');
        }
        list.listItems[index].name = updatedListItem.name;
        list.listItems[index].amount = updatedListItem.amount;
        list.listItems[index].unit = updatedListItem.unit;
        list.listItems[index].isDone = updatedListItem.isDone;
        
        try {
            list.save();
        } catch {
            throw new RequestTimeoutException();
        }
        
        return { message: "Updated", updatedListItem: updatedListItem, statusCode: 200 }

    }

    async deleteSingleList(userId: string, listId: string) {

        await this.userService.findUserById(userId);
        await this.findListById(listId);

        await this.listModel.deleteOne({_id: listId}).exec();
        await this.userService.deleteUserListId(userId, listId);
        return listId;
    }

    async deleteListItem(listId: string, itemId: string) {
        let list = await this.findListById(listId);
        const index = list.listItems.findIndex((listItem) => listItem.id === itemId);

        if (index == -1) {
            throw new NotFoundException('No list item with this id was found!');
        }
        list.listItems.splice(index, 1);

        try {
            list.save();
        } catch {
            throw new RequestTimeoutException();
        }

        return { message: "Deleted", itemId: itemId, statusCode: 200 }
        
    }
}
