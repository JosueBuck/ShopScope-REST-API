import { ListsService } from './lists.service';
import { NewListItemDto, NewListDto, UpdatedListItemDto, UserListRecipesDto, WeekRecipesIds, UpdatedWeekRecipeIngredient } from './models/list.model';
export declare class ListsController {
    private listService;
    constructor(listService: ListsService);
    createList(newListDto: NewListDto, userId: string): Promise<import("../models/response.model").IResponse>;
    getSimplifiedUserListsInfo(userId: string): Promise<import("./models/list.model").ISimplifiedList[]>;
    getSingleList(listId: string): Promise<import("../models/response.model").IResponse>;
    deleteSingleList(userId: string, listId: string): Promise<import("../models/response.model").IResponse>;
    addWeekRecipesToList(listId: string, weekRecipes: UserListRecipesDto): Promise<import("../models/response.model").IResponse>;
    removeWeekRecipesFromList(listId: string, recipesIds: WeekRecipesIds): Promise<import("./models/list.model").IListMongoose>;
    updateWeekRecipeIngredient(listId: string, ingredient: UpdatedWeekRecipeIngredient): Promise<import("../models/response.model").IResponse>;
    addListItem(listId: string, newListItem: NewListItemDto): Promise<import("../models/response.model").IResponse>;
    updateListItem(updatedListItemDto: UpdatedListItemDto): Promise<import("../models/response.model").IResponse>;
    deleteListItem(listId: string, itemId: string): Promise<import("../models/response.model").IResponse>;
}
