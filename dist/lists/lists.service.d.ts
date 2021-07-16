import { Model } from 'mongoose';
import { IList, IListItem, INewList } from './models/list.model';
export declare class ListsService {
    private readonly listModel;
    constructor(listModel: Model<IList>);
    createList(list: INewList): Promise<void>;
    getSingleList(listId: string): Promise<{
        id: any;
        name: any;
        description: any;
        listItems: any;
    }>;
    deleteSingleList(listId: string): Promise<string>;
    findList(listId: string): Promise<any>;
    addListItem(listId: string, listItem: IListItem): Promise<void>;
    deleteListItem(listId: string, itemId: string): Promise<void>;
}
