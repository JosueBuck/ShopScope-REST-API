import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IList, IListItem, INewList } from './models/list.model';

@Injectable()
export class ListsService {

    constructor(
        @InjectModel('List') private readonly listModel: Model<IList>
    ) { }

    async createList(list: INewList) {
        let newList = new this.listModel(
            {
                name: list.name,
                description: list.description,
                listItems: list.listItems,
            }
        );
        await newList.save();
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

    async deleteSingleList(listId: string) {
        await this.listModel.deleteOne({_id: listId}).exec();
        return listId;
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

    async addListItem(listId: string, listItem: IListItem) {
        let list = await this.findList(listId);
        console.log('liste:')
        console.log(list);
        list.listItems.push(listItem);
        list.save();
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
