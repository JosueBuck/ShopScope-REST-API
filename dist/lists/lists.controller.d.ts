import { ListsService } from './lists.service';
import { IListItemDto, INewListDto, IUpdatedListItemDto } from './models/list.model';
export declare class ListsController {
    private listService;
    constructor(listService: ListsService);
    createList(newListDto: INewListDto, userId: string): Promise<{
        message: string;
        listId: any;
        userId: string;
        status: number;
    }>;
    getUserLists(userId: string): Promise<string[]>;
    getSingleList(listId: string): Promise<{
        id: any;
        name: any;
        description: any;
        listItems: any;
    }>;
    deleteSingleList(userId: string, listId: string): Promise<string>;
    addListItem(listId: string, newListItem: IListItemDto): Promise<void>;
    updateListItem(updatedListItemDto: IUpdatedListItemDto): Promise<void>;
    deleteListItem(listId: string, itemId: string): Promise<void>;
}
