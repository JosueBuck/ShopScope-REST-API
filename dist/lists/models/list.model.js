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
exports.UserListsSchema = exports.UpdatedWeekRecipeIngredient = exports.WeekRecipesIds = exports.UserListRecipesDto = exports.UpdatedListItemDto = exports.ListItemDto = exports.NewListItemDto = exports.NewListDto = exports.ListSchema = exports.ItemType = void 0;
const mongoose = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const user_model_1 = require("../../user/models/user.model");
var ItemType;
(function (ItemType) {
    ItemType["FRUITS"] = "FRUITS";
    ItemType["VEGETABLE"] = "VEGETABLE";
    ItemType["BAKEWAREPRODUCTS"] = "BAKEWAREPRODUCTS";
    ItemType["CANFOODPRODUCTS"] = "CANFOODPRODUCTS";
    ItemType["MEATPRODUCTS"] = "MEATPRODUCTS";
    ItemType["MILKPRODUCTS"] = "MILKPRODUCTS";
    ItemType["FROZENPRODUCTS"] = "FROZENPRODUCTS";
    ItemType["ELECTRICALPRODUCTS"] = "ELECTRICALPRODUCTS";
    ItemType["HYGIENEPRODUCTS"] = "HYGIENEPRODUCTS";
    ItemType["DRINKS"] = "DRINKS";
    ItemType["SNACKS"] = "SNACKS";
    ItemType["SWEETS"] = "SWEETS";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
exports.ListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    itemTypes: [{ type: String, required: true }],
    weekRecipes: { type: [{ recipeName: String, ingredients: { type: [{ name: String, amount: Number, unit: String, itemType: String, isDone: Boolean }] } }] },
    listItems: { type: [{ name: String, amount: Number, unit: String, itemType: String, isDone: Boolean }], required: true },
});
;
class NewListDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], NewListDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], NewListDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => user_model_1.UserDayRecipeDto),
    __metadata("design:type", Array)
], NewListDto.prototype, "weekRecipes", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => NewListItemDto),
    __metadata("design:type", Array)
], NewListDto.prototype, "listItems", void 0);
exports.NewListDto = NewListDto;
class NewListItemDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], NewListItemDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], NewListItemDto.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], NewListItemDto.prototype, "unit", void 0);
__decorate([
    class_validator_1.IsEnum(ItemType),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], NewListItemDto.prototype, "itemType", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], NewListItemDto.prototype, "isDone", void 0);
exports.NewListItemDto = NewListItemDto;
class ListItemDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ListItemDto.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ListItemDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], ListItemDto.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ListItemDto.prototype, "unit", void 0);
__decorate([
    class_validator_1.IsEnum(ItemType),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ListItemDto.prototype, "itemType", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], ListItemDto.prototype, "isDone", void 0);
exports.ListItemDto = ListItemDto;
class UpdatedListItemDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatedListItemDto.prototype, "listId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => ListItemDto),
    __metadata("design:type", ListItemDto)
], UpdatedListItemDto.prototype, "updatedListItem", void 0);
exports.UpdatedListItemDto = UpdatedListItemDto;
class UserListRecipesDto {
}
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.ArrayMinSize(1),
    class_transformer_1.Type(() => user_model_1.UserDayRecipeDto),
    __metadata("design:type", Array)
], UserListRecipesDto.prototype, "recipes", void 0);
exports.UserListRecipesDto = UserListRecipesDto;
class WeekRecipesIds {
}
__decorate([
    class_validator_1.IsString({ each: true }),
    class_validator_1.IsNotEmpty({ each: true }),
    __metadata("design:type", Array)
], WeekRecipesIds.prototype, "ids", void 0);
exports.WeekRecipesIds = WeekRecipesIds;
class UpdatedWeekRecipeIngredient {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdatedWeekRecipeIngredient.prototype, "recipeId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdatedWeekRecipeIngredient.prototype, "ingredientId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], UpdatedWeekRecipeIngredient.prototype, "isDone", void 0);
exports.UpdatedWeekRecipeIngredient = UpdatedWeekRecipeIngredient;
exports.UserListsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    lists: { type: [{ _id: String, listName: String }] }
});
//# sourceMappingURL=list.model.js.map