"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const response_model_1 = require("../models/response.model");
const list_model_1 = require("./models/list.model");
let ListsService = class ListsService {
    constructor(listModel, userListsModel) {
        this.listModel = listModel;
        this.userListsModel = userListsModel;
    }
    async createList(list, userId) {
        let newList = new this.listModel({
            name: list.name,
            description: list.description,
            itemTypes: Object.keys(list_model_1.ItemType),
            weekRecipes: list.weekRecipes,
            listItems: list.listItems,
        });
        await this.addListToUserLists(newList, userId);
        try {
            await newList.save();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
        return { message: 'Created', updatedData: newList, statusCode: 201 };
    }
    async addListToUserLists(list, userId) {
        const simplifiedList = {
            _id: list.id,
            listName: list.name
        };
        const userLists = await this.getSimplifiedUserListsByUserId(userId);
        userLists.lists.push(simplifiedList);
        try {
            await userLists.save();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
    }
    async getSimplifiedUserListsInfo(userId) {
        const userLists = await this.getSimplifiedUserListsByUserId(userId);
        const userListsIds = userLists.lists;
        return { message: 'OK', updatedData: userListsIds, statusCode: 200 };
    }
    async getSimplifiedUserListsByUserId(userId) {
        let userLists;
        try {
            userLists = await this.userListsModel.findOne({ userId: userId }).exec();
        }
        catch (_a) {
            throw new common_1.NotFoundException('Invalid user id');
        }
        if (!userLists) {
            throw new common_1.NotFoundException('Could not find user lists');
        }
        return userLists;
    }
    async getSingleList(listId) {
        const list = await this.findListById(listId);
        return { message: 'OK', updatedData: list, statusCode: 200 };
    }
    async findListById(listId) {
        let list;
        try {
            list = await this.listModel.findById(listId).exec();
        }
        catch (_a) {
            throw new common_1.NotFoundException('Invalid list id');
        }
        if (!list) {
            throw new common_1.NotFoundException('No list with this id was found!');
        }
        return list;
    }
    async addWeekRecipesToList(listId, weekRecipes) {
        const list = await this.findListById(listId);
        list.weekRecipes = weekRecipes;
        try {
            list.save();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
        return { message: 'Created', updatedData: weekRecipes, statusCode: 201 };
    }
    async removeWeekRecipeFromList(listId, recipesIds) {
        const list = await this.findListById(listId);
        try {
            list.update({ $pull: { weekRecipes: { _id: { $in: recipesIds } } } }, { new: true }).exec();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
        return { message: "Removed", updatedData: list, statusCode: 200 };
    }
    async updateWeekRecipeIngredient(listId, ingredient) {
        const list = await this.findListById(listId);
        list.weekRecipes.map((recipe) => {
            if (recipe._id == ingredient.recipeId) {
                recipe.ingredients.map((recipeIngredient) => {
                    if (recipeIngredient._id == ingredient.ingredientId) {
                        recipeIngredient.isDone = ingredient.isDone;
                    }
                });
            }
        });
        try {
            list.save();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
        return { message: 'Changed', updatedData: list, statusCode: 200 };
    }
    async addListItem(listId, listItem) {
        let list = await this.findListById(listId);
        list.listItems.push(listItem);
        try {
            list.save();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
        return { message: 'Created', updatedData: list, statusCode: 201 };
    }
    async updateListItem(listId, updatedListItem) {
        let list = await this.findListById(listId);
        const index = list.listItems.findIndex((listItem) => listItem._id == updatedListItem._id);
        if (index == -1) {
            throw new common_1.NotFoundException('No list item with this id was found!');
        }
        list.listItems[index].name = updatedListItem.name;
        list.listItems[index].amount = updatedListItem.amount;
        list.listItems[index].unit = updatedListItem.unit;
        list.listItems[index].itemType = updatedListItem.itemType;
        list.listItems[index].isDone = updatedListItem.isDone;
        try {
            list.save();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
        return { message: 'Updated', updatedData: list, statusCode: 200 };
    }
    async deleteSingleUserList(userId, listId) {
        await this.getSimplifiedUserListsByUserId(userId);
        await this.findListById(listId);
        await this.deleteList(listId);
        await this.deleteUserListId(userId, listId);
        return { message: 'Deleted', updatedData: listId, statusCode: 200 };
    }
    async deleteList(listId) {
        try {
            await this.listModel.deleteOne({ _id: listId }).exec();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
    }
    async deleteUserListId(userId, listId) {
        try {
            await this.userListsModel.findOneAndUpdate({ userId: userId }, { $pull: { lists: { _id: listId } } }).exec();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
    }
    async deleteManyLists(lists) {
        const listIdArray = this.getIdsFromSimplifiedLists(lists);
        try {
            await this.listModel.deleteMany({ _id: { $in: listIdArray } }).exec();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
    }
    getIdsFromSimplifiedLists(lists) {
        const recipeIdArray = lists.map((list) => {
            return list._id;
        });
        return recipeIdArray;
    }
    async deleteListItem(listId, itemId) {
        let list = await this.findListById(listId);
        try {
            await list.update({ $pull: { listItems: { _id: itemId } } }, { multi: true, new: true }).exec();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
        return { message: 'Deleted', updatedData: list, statusCode: 200 };
    }
    async createNewUserListsModel(userId) {
        const userLists = new this.userListsModel({
            userId: userId,
        });
        try {
            await userLists.save();
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
    }
    async deleteUserListsModel(userId) {
        try {
            await this.userListsModel.deleteOne({ userId: userId });
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
    }
};
ListsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('List')),
    __param(1, mongoose_1.InjectModel('UserLists')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ListsService);
exports.ListsService = ListsService;
//# sourceMappingURL=lists.service.js.map