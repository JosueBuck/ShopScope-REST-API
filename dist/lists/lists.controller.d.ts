import { IResponse } from 'src/models/response.model';
import { ListsService } from './lists.service';
import { NewListItemDto, NewListDto, UpdatedListItemDto, UserListRecipesDto, WeekRecipesIdsDto, UpdatedWeekRecipeIngredientDto } from './models/list.model';
export declare class ListsController {
    private listService;
    constructor(listService: ListsService);
    createList(userId: string, newListDto: NewListDto): Promise<IResponse>;
    getSimplifiedUserLists(userId: string): Promise<IResponse>;
    getList(listId: string): Promise<IResponse>;
    deleteList(userId: string, listId: string): Promise<IResponse>;
    addWeekRecipesToList(userId: string, listId: string, weekRecipes: UserListRecipesDto): Promise<IResponse>;
    removeWeekRecipesFromList(userId: string, listId: string, recipesIds: WeekRecipesIdsDto): Promise<IResponse>;
    updateWeekRecipeIngredientInList(userId: string, listId: string, ingredient: UpdatedWeekRecipeIngredientDto): Promise<IResponse>;
    addListItem(userId: string, listId: string, newListItem: NewListItemDto): Promise<IResponse>;
    updateListItem(userId: string, listId: string, updatedListItemDto: UpdatedListItemDto): Promise<IResponse>;
    deleteListItem(userId: string, listId: string, itemId: string): Promise<IResponse>;
}
