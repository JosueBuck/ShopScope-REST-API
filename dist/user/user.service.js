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
const rxjs_1 = require("rxjs");
const registerData_model_1 = require("../auth/models/registerData.model");
let UserService = class UserService {
    constructor(userModel, userRecipesModel, userListsModel, userWeekModel) {
        this.userModel = userModel;
        this.userRecipesModel = userRecipesModel;
        this.userListsModel = userListsModel;
        this.userWeekModel = userWeekModel;
    }
    async createNewUser(userRegisterData) {
        const newUser = new this.userModel({
            username: userRegisterData.username,
            password: userRegisterData.password,
            email: userRegisterData.email,
        });
        const userRecipes = new this.userRecipesModel({
            userId: newUser.id,
        });
        const userLists = new this.userListsModel({
            userId: newUser.id,
        });
        const userWeek = new this.userWeekModel({
            userId: newUser.id,
            week: [
                {
                    name: "monday",
                    breakfast: [],
                    lunch: [],
                    dinner: []
                },
                {
                    name: "tuesday",
                    breakfast: [],
                    lunch: [],
                    dinner: []
                },
                {
                    name: "wednesday",
                    breakfast: [],
                    lunch: [],
                    dinner: []
                },
                {
                    name: "thursday",
                    breakfast: [],
                    lunch: [],
                    dinner: []
                },
                {
                    name: "friday",
                    breakfast: [],
                    lunch: [],
                    dinner: []
                },
                {
                    name: "saturday",
                    breakfast: [],
                    lunch: [],
                    dinner: []
                },
                {
                    name: "sunday",
                    breakfast: [],
                    lunch: [],
                    dinner: []
                }
            ]
        });
        try {
            await newUser.save();
            await userRecipes.save();
            await userLists.save();
            await userWeek.save();
            return newUser;
        }
        catch (_a) {
            throw new rxjs_1.TimeoutError();
        }
    }
    async deleteUser(userId) {
        await this.userModel.deleteOne({ _id: userId });
        return userId;
    }
    async getUserWeek(userId) {
        let userWeek = await this.findUserWeekById(userId);
        return userWeek;
    }
    async addRecipeToDay(userId, userDayRecipe) {
        let userWeek = await this.findUserWeekById(userId);
        let days = userWeek.week;
        days.map((day) => {
            if (day.id != userDayRecipe.dayId) {
                return;
            }
            switch (userDayRecipe.type) {
                case "breakfast": {
                    day.breakfast.push(userDayRecipe.recipe);
                    break;
                }
                case "lunch": {
                    day.lunch.push(userDayRecipe.recipe);
                    break;
                }
                case "dinner": {
                    day.dinner.push(userDayRecipe.recipe);
                    break;
                }
            }
        });
        userWeek.save();
        return userWeek;
    }
    async removeRecipeFromDay(userId, userDayRecipe) {
        let userWeek = await this.findUserWeekById(userId);
        let days = userWeek.week;
        days.map((day) => {
            if (day.id != userDayRecipe.dayId) {
                return;
            }
            switch (userDayRecipe.type) {
                case "breakfast": {
                    const index = day.breakfast.findIndex((recipe) => recipe.id === userDayRecipe.recipe.id);
                    if (index > -1) {
                        day.breakfast.splice(index, 1);
                    }
                    break;
                }
                case "lunch": {
                    const index = day.lunch.findIndex((recipe) => recipe.id === userDayRecipe.recipe.id);
                    if (index > -1) {
                        day.lunch.splice(index, 1);
                    }
                    break;
                }
                case "dinner": {
                    const index = day.dinner.findIndex((recipe) => recipe.id === userDayRecipe.recipe.id);
                    if (index > -1) {
                        day.dinner.splice(index, 1);
                    }
                    break;
                }
            }
        });
        userWeek.save();
        return userWeek;
    }
    async removeAllRecipesFromWeek(userId) {
        let userWeek = await this.findUserWeekById(userId);
        userWeek.week.map((day) => {
            day.breakfast = [];
            day.lunch = [];
            day.dinner = [];
        });
        userWeek.save();
        return userWeek;
    }
    async addRecipeIdToUser(recipeId, userId) {
        const userRecipes = await this.findUserRecipesIdsByUserId(userId);
        userRecipes.recipes.push(recipeId);
        try {
            await userRecipes.save();
        }
        catch (_a) {
            throw new rxjs_1.TimeoutError();
        }
    }
    async getUserRecipesIds(userId) {
        const userRecipes = await this.findUserRecipesIdsByUserId(userId);
        const userRecipeIds = userRecipes.recipes;
        return userRecipeIds;
    }
    async deleteUsersRecipeId(userId, recipeId) {
        this.userRecipesModel.findOneAndUpdate({ userId: userId }, { $pull: { recipes: { _id: recipeId } } }).exec();
    }
    async getUsersLatestRecipes(userId) {
        const userRecipes = await this.findUserRecipesIdsByUserId(userId);
        const recipes = userRecipes.recipes;
        const latestRecipes = recipes.slice(-4);
        return latestRecipes;
    }
    async addListToUser(listId, userId) {
        const userLists = await this.findUserListsById(userId);
        userLists.lists.push(listId);
        try {
            await userLists.save();
        }
        catch (_a) {
            throw new rxjs_1.TimeoutError();
        }
    }
    async getUserListsIds(userId) {
        const userLists = await this.findUserListsById(userId);
        const userListsIds = userLists.lists;
        return userListsIds;
    }
    async findUserByName(username) {
        let user;
        try {
            user = await this.userModel.findOne({ username: new RegExp('^' + username + '$', "i") });
            ;
            return user;
        }
        catch (_a) {
            throw new rxjs_1.TimeoutError();
        }
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
    async findUserRecipesIdsByUserId(userId) {
        let userRecipes;
        try {
            userRecipes = await this.userRecipesModel.findOne({ userId: userId }).exec();
        }
        catch (_a) {
            throw new common_1.NotFoundException('Invalid user id');
        }
        if (!userRecipes) {
            throw new common_1.NotFoundException('Could not find user recipes');
        }
        return userRecipes;
    }
    async findUserListsById(userId) {
        let userLists;
        try {
            userLists = await this.userListsModel.findOne({ userId: userId }).exec();
        }
        catch (_a) {
            throw new common_1.NotFoundException('Invalid user id');
        }
        if (!userLists) {
            throw new common_1.NotFoundException('Could not find user recipes');
        }
        return userLists;
    }
    async findUserWeekById(userId) {
        let userWeek;
        try {
            userWeek = await this.userWeekModel.findOne({ userId: userId }).exec();
        }
        catch (_a) {
            throw new common_1.NotFoundException('Invalid user id');
        }
        if (!userWeek) {
            throw new common_1.NotFoundException('Could not find user week');
        }
        return userWeek;
    }
    async deleteUserList(userId, listId) {
        this.userListsModel.findOneAndUpdate({ userId: userId }, { $pull: { lists: { _id: listId } } }).exec();
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __param(1, mongoose_1.InjectModel('UserRecipes')),
    __param(2, mongoose_1.InjectModel('UserLists')),
    __param(3, mongoose_1.InjectModel('UserWeek')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map