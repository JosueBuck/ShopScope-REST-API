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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const registerData_model_1 = require("../auth/models/registerData.model");
const lists_service_1 = require("../lists/lists.service");
const list_model_1 = require("../lists/models/list.model");
const recipe_model_1 = require("../recipes/models/recipe.model");
const recipes_service_1 = require("../recipes/recipes.service");
const weeks_service_1 = require("../weeks/weeks.service");
let UserService = class UserService {
    constructor(userModel, recipeService, listsService, weeksService) {
        this.userModel = userModel;
        this.recipeService = recipeService;
        this.listsService = listsService;
        this.weeksService = weeksService;
    }
    async createNewUser(userRegisterData) {
        const newUser = new this.userModel({
            username: userRegisterData.username,
            password: userRegisterData.password,
            email: userRegisterData.email,
        });
        await this.recipeService.createNewUserRecipeModel(newUser.id);
        await this.listsService.createNewUserListsModel(newUser.id);
        await this.weeksService.createNewUserWeeksModel(newUser.id);
        try {
            await newUser.save();
            return newUser;
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
    }
    async deleteUser(userId) {
        await this.findUserById(userId);
        await this.weeksService.getUserWeek(userId);
        const simplifiedUserRecipesObject = await this.recipeService.getSimplifiedUserRecipesByUserId(userId);
        const simplifiedUserListsObject = await this.listsService.getSimplifiedUserListsByUserId(userId);
        const simplifiedLists = simplifiedUserListsObject.lists;
        const simplifiedRecipes = simplifiedUserRecipesObject.recipes;
        try {
            await this.listsService.deleteManyLists(simplifiedLists);
            await this.recipeService.deleteManyRecipes(simplifiedRecipes);
            await this.listsService.deleteUserListsModel(userId);
            await this.recipeService.deleteUserRecipeModel(userId);
            await this.weeksService.deleteUserWeeksModel(userId);
            await this.userModel.deleteOne({ _id: userId });
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
        return { message: 'Deleted', userId: userId, statusCode: 200 };
    }
    async findUserByName(username) {
        let user;
        try {
            user = await this.userModel.findOne({ username: new RegExp('^' + username + '$', "i") });
            ;
        }
        catch (_a) {
            throw new common_1.RequestTimeoutException();
        }
        return user;
    }
    async findUserById(userId) {
        let user;
        try {
            user = await this.userModel.findOne({ _id: userId }).exec();
        }
        catch (_a) {
            throw new common_1.NotFoundException('Invalid user id');
        }
        if (!user) {
            throw new common_1.NotFoundException('Could not find user');
        }
        return user;
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        recipes_service_1.RecipesService,
        lists_service_1.ListsService,
        weeks_service_1.WeeksService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map