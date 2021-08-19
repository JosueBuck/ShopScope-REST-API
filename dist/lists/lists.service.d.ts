import { Model } from 'mongoose';
import { IList, IListItem, IListMongoose, INewList, INewListItem, ISimplifiedList, IUserListRecipe, IUserLists, IUserListsMongoose, UpdatedWeekRecipeIngredient } from './models/list.model';
export declare class ListsService {
    private readonly listModel;
    private readonly userListsModel;
    constructor(listModel: Model<IList>, userListsModel: Model<IUserLists>);
    createList(list: INewList, userId: string): Promise<{
        message: string;
        listId: any;
        userId: string;
        status: number;
    }>;
    addListToUserLists(list: IListMongoose, userId: string): Promise<void>;
    getSimplifiedUserListsInfo(userId: string): Promise<ISimplifiedList[]>;
    getSimplifiedUserListsByUserId(userId: string): Promise<IUserListsMongoose>;
    getSingleList(listId: string): Promise<{
        message: string;
        list: IListMongoose;
        status: number;
    }>;
    findListById(listId: string): Promise<IListMongoose>;
    addWeekRecipesToList(listId: string, weekRecipes: IUserListRecipe[]): Promise<{
        message: string;
        listId: string;
        weekRecipes: IUserListRecipe[];
        statusCode: number;
    }>;
    removeWeekRecipeFromList(listId: string, recipesIds: string[]): Promise<IListMongoose>;
    updateWeekRecipeIngredient(listId: string, ingredient: UpdatedWeekRecipeIngredient): Promise<{
        message: string;
        list: IListMongoose;
        statusCode: number;
    }>;
    addListItem(listId: string, listItem: INewListItem): Promise<{
        message: string;
        list: IListMongoose;
        statusCode: number;
    }>;
    updateListItem(listId: string, updatedListItem: IListItem): Promise<{
        message: string;
        updatedListItem: IListItem;
        statusCode: number;
    }>;
    deleteSingleUserList(userId: string, listId: string): Promise<{
        message: string;
        listId: string;
        statusCode: number;
    }>;
    deleteList(listId: string): Promise<void>;
    deleteUserListId(userId: string, listId: string): Promise<void>;
    deleteManyLists(lists: ISimplifiedList[]): Promise<void>;
    getIdsFromSimplifiedLists(lists: ISimplifiedList[]): string[];
    deleteListItem(listId: string, itemId: string): Promise<{
        message: string;
        itemId: string;
        statusCode: number;
    }>;
    createNewUserListsModel(userId: string): Promise<void>;
    deleteUserListsModel(userId: string): Promise<void>;
}
