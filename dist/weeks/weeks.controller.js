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
exports.WeeksController = void 0;
const common_1 = require("@nestjs/common");
const week_model_1 = require("./models/week.model");
const weeks_service_1 = require("./weeks.service");
let WeeksController = class WeeksController {
    constructor(weeksService) {
        this.weeksService = weeksService;
    }
    async getUserWeek(userId) {
        const response = await this.weeksService.getUserWeek(userId);
        return response;
    }
    async addRecipeToDay(userId, userDayRecipe) {
        const response = await this.weeksService.addRecipeToDay(userId, userDayRecipe);
        return response;
    }
    async removeRecipeFromDay(userId, userDayRecipe) {
        const response = await this.weeksService.removeRecipeFromDay(userId, userDayRecipe);
        return response;
    }
    async removeAllRecipesFromWeek(userId) {
        const response = await this.weeksService.removeAllRecipesFromWeek(userId);
        return response;
    }
};
__decorate([
    common_1.Get('getUserWeek/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WeeksController.prototype, "getUserWeek", null);
__decorate([
    common_1.Put('addRecipeToDay/:userId'),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, week_model_1.NewUserDayRecipeDataDto]),
    __metadata("design:returntype", Promise)
], WeeksController.prototype, "addRecipeToDay", null);
__decorate([
    common_1.Delete('removeRecipeFromDay/:userId'),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, week_model_1.UserDayRecipeDataDto]),
    __metadata("design:returntype", Promise)
], WeeksController.prototype, "removeRecipeFromDay", null);
__decorate([
    common_1.Delete('removeAllRecipesFromWeek/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WeeksController.prototype, "removeAllRecipesFromWeek", null);
WeeksController = __decorate([
    common_1.Controller('weeks'),
    __metadata("design:paramtypes", [weeks_service_1.WeeksService])
], WeeksController);
exports.WeeksController = WeeksController;
//# sourceMappingURL=weeks.controller.js.map