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
exports.WeeksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lists_service_1 = require("../lists/lists.service");
const response_model_1 = require("../models/response.model");
let WeeksService = class WeeksService {
    constructor(userWeekModel, listsService) {
        this.userWeekModel = userWeekModel;
        this.listsService = listsService;
    }
    async getUserWeek(userId) {
        let userWeek = await this.findUserWeekById(userId);
        return { message: 'OK', responseData: userWeek, statusCode: 200 };
    }
    async setSelectedWeekList(userId, listId) {
        await this.listsService.findListById(listId);
        let userWeek = await this.findUserWeekById(userId);
        userWeek.selectedWeekList = listId;
        try {
            await userWeek.save();
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
        return { message: 'OK', responseData: userWeek, statusCode: 200 };
    }
    async addRecipeToDay(userId, userDayRecipe) {
        let userWeek = await this.findUserWeekById(userId);
        let days = userWeek.week;
        let wasAdded = false;
        days.map((day) => {
            if (day._id != userDayRecipe.dayId) {
                return;
            }
            wasAdded = true;
            switch (userDayRecipe.type) {
                case 'breakfast': {
                    day.breakfast.push(userDayRecipe.recipe);
                    break;
                }
                case 'lunch': {
                    day.lunch.push(userDayRecipe.recipe);
                    break;
                }
                case 'dinner': {
                    day.dinner.push(userDayRecipe.recipe);
                    break;
                }
            }
        });
        if (wasAdded) {
            userWeek.save();
            return { message: 'Added', responseData: userWeek, statusCode: 200 };
        }
        else {
            throw new common_1.NotFoundException('No day with this id was found');
        }
    }
    async removeRecipeFromDay(userId, userDayRecipe) {
        let userWeek = await this.findUserWeekById(userId);
        let days = userWeek.week;
        let wasRemoved = false;
        days.map((day) => {
            if (day._id != userDayRecipe.dayId) {
                return;
            }
            switch (userDayRecipe.type) {
                case 'breakfast': {
                    const index = day.breakfast.findIndex((recipe) => recipe._id == userDayRecipe.recipe._id);
                    if (index > -1) {
                        day.breakfast.splice(index, 1);
                        wasRemoved = true;
                    }
                    break;
                }
                case 'lunch': {
                    console.log(userDayRecipe.recipe._id);
                    const index = day.lunch.findIndex((recipe) => recipe._id == userDayRecipe.recipe._id);
                    if (index > -1) {
                        day.lunch.splice(index, 1);
                        wasRemoved = true;
                    }
                    break;
                }
                case 'dinner': {
                    const index = day.dinner.findIndex((recipe) => recipe._id == userDayRecipe.recipe._id);
                    if (index > -1) {
                        day.dinner.splice(index, 1);
                        wasRemoved = true;
                    }
                    break;
                }
            }
        });
        if (wasRemoved) {
            userWeek.save();
            return { message: 'Removed', responseData: userWeek, statusCode: 200 };
        }
        else {
            throw new common_1.NotFoundException('Could not delete recipe');
        }
    }
    async removeAllRecipesFromWeek(userId) {
        let userWeek = await this.findUserWeekById(userId);
        userWeek.week.map((day) => {
            day.breakfast = [];
            day.lunch = [];
            day.dinner = [];
        });
        try {
            userWeek.save();
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
        return { message: 'Removed', responseData: userWeek, statusCode: 200 };
    }
    async findUserWeekById(userId) {
        let userWeek;
        try {
            userWeek = await this.userWeekModel.findOne({ userId: userId }).exec();
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
        if (!userWeek) {
            throw new common_1.NotFoundException('Could not find user week');
        }
        return userWeek;
    }
    async createNewUserWeeksModel(userId) {
        const userWeek = new this.userWeekModel({
            userId: userId,
            week: [
                {
                    name: 'monday',
                    breakfast: [],
                    lunch: [],
                    dinner: []
                },
                {
                    name: 'tuesday',
                    breakfast: [],
                    lunch: [],
                    dinner: []
                },
                {
                    name: 'wednesday',
                    breakfast: [],
                    lunch: [],
                    dinner: []
                },
                {
                    name: 'thursday',
                    breakfast: [],
                    lunch: [],
                    dinner: []
                },
                {
                    name: 'friday',
                    breakfast: [],
                    lunch: [],
                    dinner: []
                },
                {
                    name: 'saturday',
                    breakfast: [],
                    lunch: [],
                    dinner: []
                },
                {
                    name: 'sunday',
                    breakfast: [],
                    lunch: [],
                    dinner: []
                }
            ],
            selectedWeekList: ''
        });
        try {
            await userWeek.save();
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteUserWeeksModel(userId) {
        try {
            await this.userWeekModel.deleteOne({ userId: userId });
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
WeeksService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('UserWeek')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        lists_service_1.ListsService])
], WeeksService);
exports.WeeksService = WeeksService;
//# sourceMappingURL=weeks.service.js.map