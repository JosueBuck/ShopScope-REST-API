import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeoutError } from 'rxjs';
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
        
        await this.userService.addListToUser(newList.id, userId)

        try {
            await newList.save();
            return { message: "List was created.", listId: newList.id, userId: userId, status: 200 }
        } catch {
            throw new TimeoutError();
        }
        
    }

    async getSingleList(listId: string) {
        const list = await this.findList(listId);
        return {
            id: list.id,
            name: list.name,
            description: list.description,
            listItems: list.listItems
        }
    }

    async findList(listId: string) {
        let list;
        try {
            list = await this.listModel.findById(listId).exec();
        } catch {
            throw new NotFoundException('No list with this id was found!');
        }

        if (!list) {
            throw new NotFoundException('No list with this id was found!');
        }
        return list;
    }

    async addListItem(listId: string, listItem: INewListItem) {
        let list = await this.findList(listId);
        list.listItems.push(listItem);
        list.save();
    }

    async updateListItem(listId: string, itemId: string, updatedListItem: IListItem) {
        let list = await this.findList(listId);
        const index = list.listItems.findIndex((listItem: IListItem) => listItem.id === itemId);
        if (index == -1) {
            throw new NotFoundException('No list item with this id was found!');
        }
        list.listItems[index].name = updatedListItem.name;
        list.listItems[index].amount = updatedListItem.amount;
        list.listItems[index].unit = updatedListItem.unit;
        list.listItems[index].isDone = updatedListItem.isDone;
        
        list.save();
    }

    async deleteSingleList(userId: string, listId: string) {
        await this.listModel.deleteOne({_id: listId}).exec();
        await this.userService.deleteUserList(userId, listId);
        return listId;
    }

    async deleteListItem(listId: string, itemId: string) {
        let list = await this.findList(listId);
        const index = list.listItems.findIndex((listItem) => listItem.id === itemId);
        if (index == -1) {
            throw new NotFoundException('No list item with this id was found!');
        }
        list.listItems.splice(index, 1);
        list.save();
    }
}
