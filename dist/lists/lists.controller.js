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
exports.ListsController = void 0;
const common_1 = require("@nestjs/common");
const lists_service_1 = require("./lists.service");
const list_model_1 = require("./models/list.model");
let ListsController = class ListsController {
    constructor(listService) {
        this.listService = listService;
    }
    async createList(newListDto, userId) {
        const response = await this.listService.createList(newListDto, userId);
        return response;
    }
    async getSimplifiedUserListsInfo(userId) {
        const response = await this.listService.getSimplifiedUserListsInfo(userId);
        return response;
    }
    async getSingleList(listId) {
        const response = await this.listService.getSingleList(listId);
        return response;
    }
    async deleteSingleList(userId, listId) {
        const response = await this.listService.deleteSingleUserList(userId, listId);
        return response;
    }
    async addWeekRecipesToList(listId, weekRecipes) {
        const response = await this.listService.addWeekRecipesToList(listId, weekRecipes.recipes);
        return response;
    }
    async removeWeekRecipesFromList(listId, recipesIds) {
        const response = await this.listService.removeWeekRecipeFromList(listId, recipesIds.ids);
        return response;
    }
    async updateWeekRecipeIngredient(listId, ingredient) {
        const response = await this.listService.updateWeekRecipeIngredient(listId, ingredient);
        return response;
    }
    async addListItem(listId, newListItem) {
        const response = await this.listService.addListItem(listId, newListItem);
        return response;
    }
    async updateListItem(updatedListItemDto) {
        const listId = updatedListItemDto.listId;
        const updatedListItem = updatedListItemDto.updatedListItem;
        const response = await this.listService.updateListItem(listId, updatedListItem);
        return response;
    }
    async deleteListItem(listId, itemId) {
        const response = await this.listService.deleteListItem(listId, itemId);
        return response;
    }
};
__decorate([
    common_1.Post('createList/:userId'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_model_1.NewListDto, String]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "createList", null);
__decorate([
    common_1.Get('getSimplifiedUserListsInfo/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "getSimplifiedUserListsInfo", null);
__decorate([
    common_1.Get('getSingleList/:listId'),
    __param(0, common_1.Param('listId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "getSingleList", null);
__decorate([
    common_1.Delete('deleteSingleList/:userId/:listId'),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Param('listId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "deleteSingleList", null);
__decorate([
    common_1.Post('addWeekRecipesToList/:listId'),
    __param(0, common_1.Param('listId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, list_model_1.UserListRecipesDto]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "addWeekRecipesToList", null);
__decorate([
    common_1.Delete('removeWeekRecipesFromList/:listId'),
    __param(0, common_1.Param('listId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, list_model_1.WeekRecipesIds]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "removeWeekRecipesFromList", null);
__decorate([
    common_1.Patch('updateWeekRecipeIngredient/:listId'),
    __param(0, common_1.Param('listId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, list_model_1.UpdatedWeekRecipeIngredient]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "updateWeekRecipeIngredient", null);
__decorate([
    common_1.Post('addListItem/:listId'),
    __param(0, common_1.Param('listId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, list_model_1.NewListItemDto]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "addListItem", null);
__decorate([
    common_1.Patch('updateListItem'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_model_1.UpdatedListItemDto]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "updateListItem", null);
__decorate([
    common_1.Delete('deleteListItem/:listId/:itemId'),
    __param(0, common_1.Param('listId')),
    __param(1, common_1.Param('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "deleteListItem", null);
ListsController = __decorate([
    common_1.Controller('lists'),
    __metadata("design:paramtypes", [lists_service_1.ListsService])
], ListsController);
exports.ListsController = ListsController;
//# sourceMappingURL=lists.controller.js.map