import { Model } from 'mongoose';
import { IResponse } from 'src/models/response.model';
import { IList, IListItem, IListMongoose, INewList, INewListItem, ISimplifiedList, IUserListRecipe, IUserLists, IUserListsMongoose, IUpdatedWeekRecipeIngredient, IUpdatedList } from './models/list.model';
export declare class ListsService {
    private readonly listModel;
    private readonly userListsModel;
    constructor(listModel: Model<IList>, userListsModel: Model<IUserLists>);
    createList(list: INewList, userId: string): Promise<IResponse>;
    updateListSettings(updatedList: IUpdatedList, listId: string): Promise<IResponse>;
    clearList(listId: string): Promise<IResponse>;
    addListToUserLists(list: IListMongoose, userId: string): Promise<void>;
    getSimplifiedUserLists(userId: string): Promise<IResponse>;
    getSimplifiedUserListsByUserId(userId: string): Promise<IUserListsMongoose>;
    getList(listId: string): Promise<IResponse>;
    findListById(listId: string): Promise<IListMongoose>;
    addWeekRecipesToList(listId: string, weekRecipes: IUserListRecipe[]): Promise<IResponse>;
    removeWeekRecipeFromList(listId: string, recipesIds: string[]): Promise<IResponse>;
    updateWeekRecipeIngredient(listId: string, ingredient: IUpdatedWeekRecipeIngredient): Promise<IResponse>;
    addListItem(listId: string, listItem: INewListItem): Promise<IResponse>;
    updateListItem(listId: string, updatedListItem: IListItem): Promise<IResponse>;
    deleteUserList(userId: string, listId: string): Promise<IResponse>;
    deleteList(listId: string): Promise<void>;
    deleteUserListId(userId: string, listId: string): Promise<void>;
    deleteManyLists(lists: ISimplifiedList[]): Promise<void>;
    getIdsFromSimplifiedLists(lists: ISimplifiedList[]): string[];
    deleteListItem(listId: string, itemId: string): Promise<IResponse>;
    createNewUserListsModel(userId: string): Promise<void>;
    deleteUserListsModel(userId: string): Promise<void>;
}
