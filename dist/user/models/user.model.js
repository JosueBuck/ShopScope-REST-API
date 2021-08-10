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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDayRecipeDataDto = exports.UserDayRecipeDto = exports.UserWeekSchema = exports.UserListsSchema = exports.UserRecipesSchema = exports.UserSchema = void 0;
const mongoose = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
exports.UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
});
exports.UserRecipesSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    recipes: { type: [{ String }] },
});
exports.UserListsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    lists: { type: [{ String }] },
});
exports.UserWeekSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    week: { type: [
            {
                name: String,
                breakfast: { type: [{ recipeName: String, recipeId: String }] },
                lunch: { type: [{ recipeName: String, recipeId: String }] },
                dinner: { type: [{ recipeName: String, recipeId: String }] }
            }
        ]
    },
});
class UserDayRecipeDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserDayRecipeDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserDayRecipeDto.prototype, "recipeName", void 0);
exports.UserDayRecipeDto = UserDayRecipeDto;
class UserDayRecipeDataDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserDayRecipeDataDto.prototype, "dayId", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserDayRecipeDataDto.prototype, "type", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => UserDayRecipeDto),
    __metadata("design:type", UserDayRecipeDto)
], UserDayRecipeDataDto.prototype, "recipe", void 0);
exports.UserDayRecipeDataDto = UserDayRecipeDataDto;
//# sourceMappingURL=user.model.js.map