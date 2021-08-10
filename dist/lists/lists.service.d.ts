import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { IList, IListItem, INewList, INewListItem } from './models/list.model';
export declare class ListsService {
    private readonly userService;
    private readonly listModel;
    constructor(userService: UserService, listModel: Model<IList>);
    createList(list: INewList, userId: string): Promise<{
        message: string;
        listId: any;
        userId: string;
        status: number;
    }>;
    getSingleList(listId: string): Promise<{
        id: any;
        name: any;
        description: any;
        listItems: any;
    }>;
    findListById(listId: string): Promise<any>;
    addListItem(listId: string, listItem: INewListItem): Promise<{
        message: string;
        listItem: INewListItem;
        statusCode: number;
    }>;
    updateListItem(listId: string, updatedListItem: IListItem): Promise<{
        message: string;
        updatedListItem: IListItem;
        statusCode: number;
    }>;
    deleteSingleList(userId: string, listId: string): Promise<string>;
    deleteListItem(listId: string, itemId: string): Promise<{
        message: string;
        itemId: string;
        statusCode: number;
    }>;
}
