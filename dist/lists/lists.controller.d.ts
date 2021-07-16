import { ListsService } from './lists.service';
import { IListItemDto, INewListDto } from './models/list.model';
export declare class ListsController {
    private listService;
    constructor(listService: ListsService);
    createList(newListDto: INewListDto): Promise<void>;
    getSingleList(listId: string): Promise<{
        id: any;
        name: any;
        description: any;
        listItems: any;
    }>;
    deleteSingleList(listId: string): Promise<string>;
    addListItem(listId: string, newListItem: IListItemDto): Promise<void>;
    deleteListItem(listId: string, itemId: string): Promise<void>;
}
