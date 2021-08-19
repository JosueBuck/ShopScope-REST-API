import { ListsService } from './lists.service';
import { NewListItemDto, NewListDto, UpdatedListItemDto, UserListRecipesDto, WeekRecipesIds, UpdatedWeekRecipeIngredient } from './models/list.model';
export declare class ListsController {
    private listService;
    constructor(listService: ListsService);
    createList(newListDto: NewListDto, userId: string): Promise<{
        message: string;
        listId: any;
        userId: string;
        status: number;
    }>;
    getSimplifiedUserListsInfo(userId: string): Promise<import("./models/list.model").ISimplifiedList[]>;
    getSingleList(listId: string): Promise<{
        message: string;
        list: import("./models/list.model").IListMongoose;
        status: number;
    }>;
    deleteSingleList(userId: string, listId: string): Promise<{
        message: string;
        listId: string;
        statusCode: number;
    }>;
    addWeekRecipesToList(listId: string, weekRecipes: UserListRecipesDto): Promise<{
        message: string;
        listId: string;
        weekRecipes: import("./models/list.model").IUserListRecipe[];
        statusCode: number;
    }>;
    removeWeekRecipesFromList(listId: string, recipesIds: WeekRecipesIds): Promise<import("./models/list.model").IListMongoose>;
    updateWeekRecipeIngredient(listId: string, ingredient: UpdatedWeekRecipeIngredient): Promise<{
        message: string;
        list: import("./models/list.model").IListMongoose;
        statusCode: number;
    }>;
    addListItem(listId: string, newListItem: NewListItemDto): Promise<{
        message: string;
        list: import("./models/list.model").IListMongoose;
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
