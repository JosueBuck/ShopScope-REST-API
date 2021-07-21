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
    findList(listId: string): Promise<any>;
    getUserListsId(userId: string): Promise<string[]>;
    addListItem(listId: string, listItem: INewListItem): Promise<void>;
    updateListItem(listId: string, itemId: string, updatedListItem: IListItem): Promise<void>;
    deleteSingleList(userId: string, listId: string): Promise<string>;
    deleteListItem(listId: string, itemId: string): Promise<void>;
}
