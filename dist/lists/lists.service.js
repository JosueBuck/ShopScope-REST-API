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
const rxjs_1 = require("rxjs");
const user_service_1 = require("../user/user.service");
let ListsService = class ListsService {
    constructor(userService, listModel) {
        this.userService = userService;
        this.listModel = listModel;
    }
    async createList(list, userId) {
        let newList = new this.listModel({
            name: list.name,
            description: list.description,
            listItems: list.listItems,
        });
        await this.userService.addListToUser(newList.id, userId);
        try {
            await newList.save();
            return { message: "List was created.", listId: newList.id, userId: userId, status: 200 };
        }
        catch (_a) {
            throw new rxjs_1.TimeoutError();
        }
    }
    async getSingleList(listId) {
        const list = await this.findList(listId);
        return {
            id: list.id,
            name: list.name,
            description: list.description,
            listItems: list.listItems
        };
    }
    async findList(listId) {
        let list;
        try {
            list = await this.listModel.findById(listId).exec();
        }
        catch (_a) {
            throw new common_1.NotFoundException('No list with this id was found!');
        }
        if (!list) {
            throw new common_1.NotFoundException('No list with this id was found!');
        }
        return list;
    }
    async addListItem(listId, listItem) {
        let list = await this.findList(listId);
        list.listItems.push(listItem);
        list.save();
    }
    async updateListItem(listId, itemId, updatedListItem) {
        let list = await this.findList(listId);
        const index = list.listItems.findIndex((listItem) => listItem.id === itemId);
        if (index == -1) {
            throw new common_1.NotFoundException('No list item with this id was found!');
        }
        list.listItems[index].name = updatedListItem.name;
        list.listItems[index].amount = updatedListItem.amount;
        list.listItems[index].unit = updatedListItem.unit;
        list.listItems[index].isDone = updatedListItem.isDone;
        list.save();
    }
    async deleteSingleList(userId, listId) {
        await this.listModel.deleteOne({ _id: listId }).exec();
        await this.userService.deleteUserList(userId, listId);
        return listId;
    }
    async deleteListItem(listId, itemId) {
        let list = await this.findList(listId);
        const index = list.listItems.findIndex((listItem) => listItem.id === itemId);
        if (index == -1) {
            throw new common_1.NotFoundException('No list item with this id was found!');
        }
        list.listItems.splice(index, 1);
        list.save();
    }
};
ListsService = __decorate([
    common_1.Injectable(),
    __param(1, mongoose_1.InjectModel('List')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        mongoose_2.Model])
], ListsService);
exports.ListsService = ListsService;
//# sourceMappingURL=lists.service.js.map