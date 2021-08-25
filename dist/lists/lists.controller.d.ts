import { IResponse } from 'src/models/response.model';
import { ListsService } from './lists.service';
import { NewListItemDto, NewListDto, UpdatedListItemDto, UserListRecipesDto, WeekRecipesIds, UpdatedWeekRecipeIngredient } from './models/list.model';
export declare class ListsController {
    private listService;
    constructor(listService: ListsService);
    createList(userId: string, newListDto: NewListDto): Promise<IResponse>;
    getSimplifiedUserListsInfo(userId: string): Promise<IResponse>;
    getSingleList(listId: string): Promise<IResponse>;
    deleteSingleList(userId: string, listId: string): Promise<IResponse>;
    addWeekRecipesToList(userId: string, listId: string, weekRecipes: UserListRecipesDto): Promise<IResponse>;
    removeWeekRecipesFromList(userId: string, listId: string, recipesIds: WeekRecipesIds): Promise<IResponse>;
    updateWeekRecipeIngredientInList(userId: string, listId: string, ingredient: UpdatedWeekRecipeIngredient): Promise<IResponse>;
    addListItem(userId: string, listId: string, newListItem: NewListItemDto): Promise<IResponse>;
    updateListItem(userId: string, listId: string, updatedListItemDto: UpdatedListItemDto): Promise<IResponse>;
    deleteListItem(userId: string, listId: string, itemId: string): Promise<IResponse>;
}
