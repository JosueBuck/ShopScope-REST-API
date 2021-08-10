import { ListsService } from './lists.service';
import { NewListItemDto, NewListDto, UpdatedListItemDto } from './models/list.model';
export declare class ListsController {
    private listService;
    constructor(listService: ListsService);
    createList(newListDto: NewListDto, userId: string): Promise<{
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
    deleteSingleList(userId: string, listId: string): Promise<string>;
    addListItem(listId: string, newListItem: NewListItemDto): Promise<{
        message: string;
        listItem: import("./models/list.model").INewListItem;
        statusCode: number;
    }>;
    updateListItem(updatedListItemDto: UpdatedListItemDto): Promise<{
        message: string;
        updatedListItem: import("./models/list.model").IListItem;
        statusCode: number;
    }>;
    deleteListItem(listId: string, itemId: string): Promise<{
        message: string;
        itemId: string;
        statusCode: number;
    }>;
}
