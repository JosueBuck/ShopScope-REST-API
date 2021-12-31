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
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt.auth.guard");
const user_auth_guard_1 = require("../auth/guards/user.auth.guard");
const response_model_1 = require("../models/response.model");
const lists_service_1 = require("./lists.service");
const list_model_1 = require("./models/list.model");
let ListsController = class ListsController {
    constructor(listService) {
        this.listService = listService;
    }
    async createList(userId, newListDto) {
        const response = await this.listService.createList(newListDto, userId);
        return response;
    }
    async clearList(userId, listId) {
        const response = await this.listService.clearList(userId, listId);
        return response;
    }
    async updateListSettings(userId, listId, updatedListDto) {
        const response = await this.listService.updateListSettings(updatedListDto, listId);
        return response;
    }
    async getSimplifiedUserLists(userId) {
        const response = await this.listService.getSimplifiedUserLists(userId);
        return response;
    }
    async getList(listId) {
        const response = await this.listService.getList(listId);
        return response;
    }
    async deleteList(userId, listId) {
        const response = await this.listService.deleteUserList(userId, listId);
        return response;
    }
    async addWeekRecipesToList(userId, listId, weekRecipes) {
        const response = await this.listService.addWeekRecipesToList(userId, listId, weekRecipes.recipes);
        return response;
    }
    async removeWeekRecipesFromList(userId, listId, recipesIds) {
        const response = await this.listService.removeWeekRecipeFromList(userId, listId, recipesIds.ids);
        return response;
    }
    async updateWeekRecipeIngredientInList(userId, listId, ingredient) {
        const response = await this.listService.updateWeekRecipeIngredient(listId, ingredient);
        return response;
    }
    async addListItem(userId, listId, newListItem) {
        const response = await this.listService.addListItem(userId, listId, newListItem);
        return response;
    }
    async updateListItem(userId, listId, updatedListItemDto) {
        const updatedListItem = updatedListItemDto.updatedListItem;
        const response = await this.listService.updateListItem(listId, updatedListItem);
        return response;
    }
    async deleteListItem(userId, listId, itemId) {
        const response = await this.listService.deleteListItem(userId, listId, itemId);
        return response;
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    (0, common_1.Post)('createList/:userId'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Created',
        type: response_model_1.CreateListResponse
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'A problem occured while processing the api call'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Invalid user id | Could not find user lists'
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, list_model_1.NewListDto]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "createList", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    (0, common_1.Delete)('clearList/:userId/:listId'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Deleted',
        type: response_model_1.CreateListResponse
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'A problem occured while processing the api call'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Invalid user id | Could not find list'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('listId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "clearList", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    (0, common_1.Post)('updateListSettings/:userId/:listId'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'OK',
        type: response_model_1.CreateListResponse
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'A problem occured while processing the api call'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Invalid user id | Could not find list'
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('listId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, list_model_1.UpdatedListDto]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "updateListSettings", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    (0, common_1.Get)('getSimplifiedUserLists/:userId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'OK',
        type: response_model_1.GetSimplifiedUserListsResponse
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Invalid user id | Could not find user lists'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "getSimplifiedUserLists", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getList/:listId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'OK',
        type: response_model_1.GetListResponse
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Invalid list id | No list with this id was found'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('listId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "getList", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    (0, common_1.Delete)('deleteList/:userId/:listId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'OK',
        type: response_model_1.DeleteListResponse
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'A problem occured while processing the api call'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Invalid user id | Invalid list id | Could not find user lists | No list with this id was found'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('listId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "deleteList", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    (0, common_1.Post)('addWeekRecipesToList/:userId/:listId'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Created',
        type: response_model_1.AddWeekRecipesToList
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'A problem occured while processing the api call'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Invalid list id | No list with this id was found'
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('listId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, list_model_1.UserListRecipesDto]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "addWeekRecipesToList", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    (0, common_1.Delete)('removeWeekRecipesFromList/:userId/:listId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'OK',
        type: response_model_1.RemoveWeekRecipeFromListResponse
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'A problem occured while processing the api call'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Invalid list id | No list with this id was found'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('listId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, list_model_1.WeekRecipesIdsDto]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "removeWeekRecipesFromList", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    (0, common_1.Patch)('updateWeekRecipeIngredientInList/:userId/:listId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'OK',
        type: response_model_1.UpdateWeekRecipeIngredientInList
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'A problem occured while processing the api call'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Invalid list id | No list with this id was found'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('listId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, list_model_1.UpdatedWeekRecipeIngredientDto]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "updateWeekRecipeIngredientInList", null);
__decorate([
    openapi.ApiOperation({ description: "TO-DO: add addNormalRecipesToList -> use a new variable to store added recipes" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    (0, common_1.Post)('addListItem/:userId/:listId'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Created',
        type: response_model_1.AddListItemResponse
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'A problem occured while processing the api call'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Invalid list id | No list with this id was found'
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('listId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, list_model_1.NewListItemDto]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "addListItem", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    (0, common_1.Patch)('updateListItem/:userId/:listId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Created',
        type: response_model_1.UpdateListItemResponse
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'A problem occured while processing the api call'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Invalid list id | No list with this id was found'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('listId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, list_model_1.UpdatedListItemDto]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "updateListItem", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserGuard),
    (0, common_1.Delete)('deleteListItem/:userId/:listId/:itemId'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Created',
        type: response_model_1.DeleteListItemResponse
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'A problem occured while processing the api call'
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Invalid list id | No list with this id was found'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('listId')),
    __param(2, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "deleteListItem", null);
ListsController = __decorate([
    (0, swagger_1.ApiTags)('lists'),
    (0, common_1.Controller)('lists'),
    __metadata("design:paramtypes", [lists_service_1.ListsService])
], ListsController);
exports.ListsController = ListsController;
//# sourceMappingURL=lists.controller.js.map