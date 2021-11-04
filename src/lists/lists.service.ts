import { Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,  } from 'mongoose';
import { IResponse } from 'src/models/response.model';
import { UserDayRecipeDto } from 'src/weeks/models/week.model';
import { IList, IListItem, IListMongoose, IMongooseIdArray, INewList, INewListItem, ISimplifiedList, ItemType, IUserListRecipe, IUserLists, IUserListsMongoose, IUpdatedWeekRecipeIngredient, IUpdatedList } from './models/list.model';
const mongoose = require('mongoose');

@Injectable()
export class ListsService {

    constructor(
        @InjectModel('List') private readonly listModel: Model<IList>,
        @InjectModel('UserLists') private readonly userListsModel: Model<IUserLists>,
    ) { }

    async createList(list: INewList, userId: string): Promise<IResponse> {

        // object id of the week recipes is created when the recipe is added to the week - its than also used as the _id for the identifier in the lists week recipe

        // this.createObjectIdsForWeekRecipes(list.weekRecipes);

        let newList: IListMongoose = new this.listModel(
            {
                name: list.name,
                description: list.description,
                itemTypes: Object.keys(ItemType),
                weekRecipes: list.weekRecipes,
                listItems: list.listItems,
                itemCounter: this.getListsOverallItemCounter(list),
                listPictureUrl: list.listPictureUrl
            }
        );
        
        await this.addListToUserLists(newList, userId)

        try {
            await newList.save();
        } catch {
            throw new InternalServerErrorException();
        }
        
        return { message: 'Created', responseData: newList, statusCode: 201 };

    }

    // object id of the week recipes is created when the recipe is added to the week - its than also used as the _id for the identifier in the lists week recipe >>

    /* createObjectIdsForWeekRecipes(recipes: UserDayRecipeDto[]): UserDayRecipeDto[] {

        recipes.map((recipe) => {
            recipe._id = new mongoose.Types.ObjectId();
        })

        return recipes;
    } */

    async updateListSettings(updatedList: IUpdatedList, listId: string): Promise<IResponse> {

        const list: IListMongoose = await this.findListById(listId);
        list.name = updatedList.name;
        list.description = updatedList.description;
        list.listPictureUrl = updatedList.listPictureUrl;
        

        try {
            list.save();
        } catch {
            throw new InternalServerErrorException();
        }

        return { message: 'OK', responseData: list, statusCode: 201 }

    }

    async clearList(userId: string, listId: string): Promise<IResponse> {

        const list: IListMongoose = await this.findListById(listId);
        list.listItems = [];
        
        const amountOfAllListItems = this.getListsOverallItemCounter(list);

        list.itemCounter = amountOfAllListItems;

        await this.updateSimpliefiedUserListsItemCounter(userId, list);

        try {
            list.save();
        } catch {
            throw new InternalServerErrorException();
        }

        return { message: 'OK', responseData: list, statusCode: 201 }

    }

    async updateSimpliefiedUserListsItemCounter(userId: string, list: IListMongoose) {

        const simplifiedUserListsObject: IUserListsMongoose = await this.getSimplifiedUserListsByUserId(userId);

        const simplifiedListindex: number =  simplifiedUserListsObject.lists.findIndex(simplifiedList => simplifiedList._id == list.id);

        simplifiedUserListsObject.lists[simplifiedListindex].itemCounter = list.itemCounter;

        try {
            simplifiedUserListsObject.save();
        } catch {
            throw new InternalServerErrorException();
        }

    }

    getListsOverallItemCounter(list: IListMongoose | INewList): number {

        const amountOfNormalListitems: number = list.listItems.length;

        let amountOfWeekReceipesItems: number = 0;

        list.weekRecipes.map((receipe) => {
            amountOfWeekReceipesItems += receipe.ingredients.length;
        })

        const amountOfAllListItems: number = amountOfNormalListitems + amountOfWeekReceipesItems;

        return amountOfAllListItems;
    }

    async addListToUserLists(list: IListMongoose, userId: string): Promise<void> {

        const simplifiedList: ISimplifiedList = {
            _id: list.id,
            listName: list.name,
            itemCounter: list.itemCounter,
            listPictureUrl: list.listPictureUrl
        }

        const userLists: IUserListsMongoose = await this.getSimplifiedUserListsByUserId(userId);
        userLists.lists.push(simplifiedList);

        try {
            await userLists.save();
        } catch {
            throw new InternalServerErrorException();
        } 
    }

    async getSimplifiedUserLists(userId: string): Promise<IResponse> {

        const userLists: IUserListsMongoose = await this.getSimplifiedUserListsByUserId(userId);

        const userListsIds: ISimplifiedList[] = userLists.lists;

        return { message: 'OK', responseData: userListsIds, statusCode: 200 };

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

    async getList(listId: string): Promise<IResponse> {

        const list: IListMongoose = await this.findListById(listId);

        return { message: 'OK', responseData: list, statusCode: 200 };

    }

    async findListById(listId: string): Promise<IListMongoose> {

        let list: IListMongoose;

        try {
            list = await this.listModel.findById(listId).exec();
        } catch {
            throw new NotFoundException('Invalid list id');
        }

        if (!list) {
            throw new NotFoundException('No list with this id was found');
        }

        return list;

    }

    async addWeekRecipesToList(userId: string, listId: string, weekRecipes: IUserListRecipe[]): Promise<IResponse> {

        // object id of the week recipes is created when the recipe is added to the week - its than also used as the _id for the identifier in the lists week recipe

        // this.createObjectIdsForWeekRecipes(weekRecipes);

        const list: IListMongoose = await this.findListById(listId);
        list.weekRecipes = weekRecipes;

        list.itemCounter = this.getListsOverallItemCounter(list);

        await this.updateSimpliefiedUserListsItemCounter(userId, list);

        try {
            list.save();
        } catch {
            throw new InternalServerErrorException();
        }

        return { message: 'Created', responseData: list, statusCode: 201 }

    }

    async removeWeekRecipeFromList(userId: string, listId: string, recipesIds: string[]): Promise<IResponse> {

        const list: IListMongoose = await this.findListById(listId);

        recipesIds.map((id) => {
            list.weekRecipes.map((recipe, index) => {
                if (recipe._id == id) {
                    list.weekRecipes.splice(index, 1);
                }
            })
        })

        try {
            list.save();
        } catch {
            throw new InternalServerErrorException();
        }

        list.itemCounter = this.getListsOverallItemCounter(list);

        await this.updateSimpliefiedUserListsItemCounter(userId, list);

        return { message: "Removed", responseData: list, statusCode: 200 };

    }

    async updateWeekRecipeIngredient(listId: string, ingredient: IUpdatedWeekRecipeIngredient): Promise<IResponse> {

        const list: IListMongoose = await this.findListById(listId);
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
            throw new InternalServerErrorException();
        }

        return { message: 'Changed', responseData: list, statusCode: 200 }

    }

    async addListItem(userId: string, listId: string, listItem: INewListItem): Promise<IResponse> {

        

        let list: IListMongoose = await this.findListById(listId);
        list.listItems.push(listItem);

        const amountOfAllListItems = this.getListsOverallItemCounter(list);
        
        list.itemCounter = amountOfAllListItems;

        await this.updateSimpliefiedUserListsItemCounter(userId, list);

        try {
            list.save();
        } catch {
            throw new InternalServerErrorException();
        }

        return { message: 'Created', responseData: list, statusCode: 201 }
        
    }

    async updateListItem(listId: string, updatedListItem: IListItem): Promise<IResponse> {

        let list: IListMongoose = await this.findListById(listId);

        const index: number = list.listItems.findIndex((listItem: IListItem) => listItem._id == updatedListItem._id);

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
            throw new InternalServerErrorException();
        }
        
        return { message: 'Updated', responseData: list, statusCode: 200 }

    }

    async deleteUserList(userId: string, listId: string): Promise<IResponse> {

        await this.getSimplifiedUserListsByUserId(userId);
        await this.findListById(listId);

        await this.deleteList(listId);
        await this.deleteUserListId(userId, listId);

        return { message: 'Deleted', responseData: listId, statusCode: 200 };

    }

    async deleteList(listId: string): Promise<void> {

        try {
            await this.listModel.deleteOne({_id: listId}).exec();
        } catch {
            throw new InternalServerErrorException();
        }

    }

    async deleteUserListId(userId: string, listId: string): Promise<void> {

        try {
            await this.userListsModel.findOneAndUpdate(
                { userId: userId },
                { $pull: { lists: { _id: listId} }}
            ).exec();
        } catch {
            throw new InternalServerErrorException();
        }
        
    }

    async deleteManyLists(lists: ISimplifiedList[]): Promise<void> {

        const listIdArray: string[] = this.getIdsFromSimplifiedLists(lists);

        try {
            await this.listModel.deleteMany({ _id: { $in: listIdArray }}).exec();
        } catch {
            throw new InternalServerErrorException();
        } 

    }

    getIdsFromSimplifiedLists(lists: ISimplifiedList[]): string[] {

        const recipeIdArray: string[] = lists.map((list) => {
            return list._id
        });
        return recipeIdArray;

    }

    async deleteListItem(userId: string, listId: string, itemId: string): Promise<IResponse> {

        let list: IListMongoose = await this.findListById(listId);

        list.listItems.map((item, index) => {
           if (item._id == itemId)
           list.listItems.splice(index, 1);
        });

        try {
            list.save();
        } catch {
            throw new InternalServerErrorException();
        }

        list.itemCounter = this.getListsOverallItemCounter(list);

        await this.updateSimpliefiedUserListsItemCounter(userId, list);

        return { message: 'Deleted', responseData: list, statusCode: 200 }
        
    }


    async createNewUserListsModel(userId: string): Promise<void> {

        const userLists: IUserListsMongoose = new this.userListsModel(
            {
                userId: userId,
            }
        );

        try {
            await userLists.save();
        } catch {
            throw new InternalServerErrorException();
        }

    }

    async deleteUserListsModel(userId: string): Promise<void> {

        try {
            await this.userListsModel.deleteOne({ userId: userId });
        } catch {
            throw new InternalServerErrorException();
        }

    }

}
