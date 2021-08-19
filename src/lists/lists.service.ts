import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IList, IListItem, IListMongoose, IMongooseIdArray, INewList, INewListItem, ISimplifiedList, ItemType, IUserListRecipe, IUserLists, IUserListsMongoose, UpdatedWeekRecipeIngredient } from './models/list.model';

@Injectable()
export class ListsService {

    constructor(
        @InjectModel('List') private readonly listModel: Model<IList>,
        @InjectModel('UserLists') private readonly userListsModel: Model<IUserLists>,
    ) { }

    async createList(list: INewList, userId: string) {
        let newList = new this.listModel(
            {
                name: list.name,
                description: list.description,
                itemTypes: Object.keys(ItemType),
                weekRecipes: list.weekRecipes,
                listItems: list.listItems,
            }
        );
        
        await this.addListToUserLists(newList, userId)

        try {
            await newList.save();
        } catch {
            throw new RequestTimeoutException();
        }
        
        return { message: 'Created', listId: newList.id, userId: userId, status: 201 };

    }

    async addListToUserLists(list: IListMongoose, userId: string) {

        const simplifiedList: ISimplifiedList = {
            _id: list.id,
            listName: list.name
        }
        const userLists: IUserListsMongoose = await this.getSimplifiedUserListsByUserId(userId);
        userLists.lists.push(simplifiedList);

        try {
            await userLists.save();
        } catch {
            throw new RequestTimeoutException();
        } 
    }

    async getSimplifiedUserListsInfo(userId: string) {

        const userLists = await this.getSimplifiedUserListsByUserId(userId);
        const userListsIds = userLists.lists;
        return userListsIds;

    }

    async getSimplifiedUserListsByUserId(userId: string): Promise<IUserListsMongoose> {

        let userLists: IUserListsMongoose;

        try {
            userLists = await this.userListsModel.findOne({ userId: userId }).exec();
        } catch {
            throw new NotFoundException('Invalid user id');
        }

        if (!userLists) {
            throw new NotFoundException('Could not find user lists');
        }

        return userLists;

    }

    async getSingleList(listId: string) {

        const list = await this.findListById(listId);

        return { message: '', list: list, status: 200 };

    }

    async findListById(listId: string): Promise<IListMongoose> {

        let list: IListMongoose;

        try {
            list = await this.listModel.findById(listId).exec();
        } catch {
            throw new NotFoundException('Invalid list id');
        }

        if (!list) {
            throw new NotFoundException('No list with this id was found!');
        }
        return list;

    }

    async addWeekRecipesToList(listId: string, weekRecipes: IUserListRecipe[]) {

        const list = await this.findListById(listId);
        list.weekRecipes = weekRecipes;

        try {
            list.save();
        } catch {
            throw new RequestTimeoutException();
        }

        return { message: 'Created', listId: listId, weekRecipes: weekRecipes, statusCode: 201 }

    }

    async removeWeekRecipeFromList(listId: string, recipesIds: string[]) {

        const list = await this.findListById(listId);

        try {
            list.update(
                { $pull: { weekRecipes: { _id: { $in: recipesIds  }}} },
                { new: true }
            ).exec();
        } catch {
            throw new RequestTimeoutException();
        }

        return list;

    }

    async updateWeekRecipeIngredient(listId: string, ingredient: UpdatedWeekRecipeIngredient) {

        const list = await this.findListById(listId);
        list.weekRecipes.map((recipe) => {
            if (recipe._id == ingredient.recipeId) {
                recipe.ingredients.map((recipeIngredient) => {
                    if (recipeIngredient._id == ingredient.ingredientId) {
                        recipeIngredient.isDone = ingredient.isDone;
                    }
                })
            }
        });

        try {
            list.save();
        } catch {
            throw new RequestTimeoutException();
        }

        return { message: 'Changed', list: list, statusCode: 200 }

    }

    async addListItem(listId: string, listItem: INewListItem) {

        let list = await this.findListById(listId);
        list.listItems.push(listItem);

        try {
            list.save();
        } catch {
            throw new RequestTimeoutException();
        }

        return { message: 'Created', list: list, statusCode: 201 }
        
    }

    async updateListItem(listId: string, updatedListItem: IListItem) {

        let list = await this.findListById(listId);
        const index = list.listItems.findIndex((listItem: IListItem) => listItem._id == updatedListItem._id);

        if (index == -1) {
            throw new NotFoundException('No list item with this id was found!');
        }
        list.listItems[index].name = updatedListItem.name;
        list.listItems[index].amount = updatedListItem.amount;
        list.listItems[index].unit = updatedListItem.unit;
        list.listItems[index].itemType = updatedListItem.itemType;
        list.listItems[index].isDone = updatedListItem.isDone;
        
        try {
            list.save();
        } catch {
            throw new RequestTimeoutException();
        }
        
        return { message: 'Updated', updatedListItem: updatedListItem, statusCode: 200 }

    }

    async deleteSingleUserList(userId: string, listId: string) {

        await this.getSimplifiedUserListsByUserId(userId);
        await this.findListById(listId);

        await this.deleteList(listId);
        await this.deleteUserListId(userId, listId);

        return { message: 'Deleted', listId: listId, statusCode: 200 };

    }

    async deleteList(listId: string) {

        try {
            await this.listModel.deleteOne({_id: listId}).exec();
        } catch {
            throw new RequestTimeoutException();
        }

    }

    async deleteUserListId(userId: string, listId: string) {

        try {
            this.userListsModel.findOneAndUpdate(
                { userId: userId },
                { $pull: { lists: { _id: listId} }}
            ).exec();
        } catch {
            throw new RequestTimeoutException();
        }
        
    }

    async deleteManyLists(lists: ISimplifiedList[] ) {

        const listIdArray = this.getIdsFromSimplifiedLists(lists);

        try {
            await this.listModel.deleteMany({ _id: { $in: listIdArray }}).exec();
        } catch {
            throw new RequestTimeoutException();
        } 

    }

    getIdsFromSimplifiedLists(lists: ISimplifiedList[]) {

        const recipeIdArray: string[] = lists.map((list) => {
            return list._id
        });

        return recipeIdArray;

    }

    async deleteListItem(listId: string, itemId: string) {

        let list = await this.findListById(listId);

        try {
            await list.update(
                { $pull: { listItems: { _id: itemId }}},
                { multi: true }
            ).exec();
        } catch {
            throw new RequestTimeoutException();
        }

        return { message: 'Deleted', itemId: itemId, statusCode: 200 }
        
    }


    async createNewUserListsModel(userId: string) {

        const userLists = new this.userListsModel(
            {
                userId: userId,
            }
        );

        try {
            await userLists.save();
        } catch {
            throw new RequestTimeoutException();
        }

    }

    async deleteUserListsModel(userId: string) {

        try {
            await this.userListsModel.deleteOne({ userId: userId });
        } catch {
            throw new RequestTimeoutException();
        }

    }
}
