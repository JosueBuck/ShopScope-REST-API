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
exports.UserListsSchema = exports.UpdatedWeekRecipeIngredientDto = exports.WeekRecipesIdsDto = exports.UserListRecipesDto = exports.UpdatedListItemDto = exports.ListItemDto = exports.NewListItemDto = exports.UpdatedListDto = exports.NewListDto = exports.ListSchema = exports.ItemType = void 0;
const openapi = require("@nestjs/swagger");
const mongoose = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const week_model_1 = require("../../weeks/models/week.model");
const swagger_1 = require("@nestjs/swagger");
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
    ItemType["OTHERS"] = "OTHERS";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
exports.ListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    itemTypes: [{ type: String, required: true }],
    weekRecipes: { type: [{ recipeName: String, garnish: String, originalRecipeId: String, ingredients: { type: [{ name: String, amount: Number, unit: String, itemType: String, isDone: Boolean }] } }] },
    listItems: { type: [{ name: String, amount: Number, unit: String, itemType: String, isDone: Boolean }], required: true },
    itemCounter: { type: Number },
    listPictureUrl: { type: String, required: true }
});
;
;
;
class NewListDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, weekRecipes: { required: true, type: () => [require("../../weeks/models/week.model").UserDayRecipeDto] }, listItems: { required: true, type: () => [require("./list.model").NewListItemDto] }, itemCounter: { required: true, type: () => Number }, listPictureUrl: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List name',
        example: 'testList'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NewListDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the list',
        example: 'This is a test description'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewListDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => week_model_1.UserDayRecipeDto),
    __metadata("design:type", Array)
], NewListDto.prototype, "weekRecipes", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NewListItemDto),
    __metadata("design:type", Array)
], NewListDto.prototype, "listItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of items inside of a list',
        example: 0
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Max)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], NewListDto.prototype, "itemCounter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Url of the picture which is used for the list.',
        example: 'www.testUrl.com'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewListDto.prototype, "listPictureUrl", void 0);
exports.NewListDto = NewListDto;
class UpdatedListDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, listPictureUrl: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List name',
        example: 'testList'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdatedListDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the list',
        example: 'This is a test description'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatedListDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Url of the picture which is used for the list.',
        example: 'www.testUrl.com'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatedListDto.prototype, "listPictureUrl", void 0);
exports.UpdatedListDto = UpdatedListDto;
class NewListItemDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, amount: { required: true, type: () => Number }, unit: { required: true, type: () => String }, itemType: { required: true, enum: require("./list.model").ItemType }, isDone: { required: true, type: () => Boolean } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ingredient name',
        example: 'testIngredient'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NewListItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Amount of the specific ingredient',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NewListItemDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unit regarding the amount',
        example: 'testUnit'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewListItemDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Defines what type of the item',
        example: ItemType.SNACKS
    }),
    (0, class_validator_1.IsEnum)(ItemType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NewListItemDto.prototype, "itemType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Holds the information, if the ingredient is already in your shopping cart',
        example: false
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], NewListItemDto.prototype, "isDone", void 0);
exports.NewListItemDto = NewListItemDto;
class ListItemDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { _id: { required: true, type: () => String }, name: { required: true, type: () => String }, amount: { required: true, type: () => Number }, unit: { required: true, type: () => String }, itemType: { required: true, enum: require("./list.model").ItemType }, isDone: { required: true, type: () => Boolean } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ingredient id',
        example: '612cb926a6effb11a4dbb963'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ListItemDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ingredient name',
        example: 'testIngredient'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ListItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Amount of the specific ingredient',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ListItemDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unit regarding the amount',
        example: 'testUnit'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListItemDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Defines what type of the item',
        example: ItemType.SNACKS
    }),
    (0, class_validator_1.IsEnum)(ItemType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ListItemDto.prototype, "itemType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Holds the information, if the ingredient is already in your shopping cart',
        example: false
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], ListItemDto.prototype, "isDone", void 0);
exports.ListItemDto = ListItemDto;
class UpdatedListItemDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { updatedListItem: { required: true, type: () => require("./list.model").ListItemDto } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ListItemDto),
    __metadata("design:type", ListItemDto)
], UpdatedListItemDto.prototype, "updatedListItem", void 0);
exports.UpdatedListItemDto = UpdatedListItemDto;
class UserListRecipesDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { recipes: { required: true, type: () => [require("../../weeks/models/week.model").UserDayRecipeDto] } };
    }
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => week_model_1.UserDayRecipeDto),
    __metadata("design:type", Array)
], UserListRecipesDto.prototype, "recipes", void 0);
exports.UserListRecipesDto = UserListRecipesDto;
class WeekRecipesIdsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { ids: { required: true, type: () => [String] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['612cb926a6effb11a4dbb962']
    }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsMongoId)({ each: true }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    __metadata("design:type", Array)
], WeekRecipesIdsDto.prototype, "ids", void 0);
exports.WeekRecipesIdsDto = WeekRecipesIdsDto;
class UpdatedWeekRecipeIngredientDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { recipeId: { required: true, type: () => String }, ingredientId: { required: true, type: () => String }, isDone: { required: true, type: () => Boolean } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '612cb926a6effb11a4dbb962'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatedWeekRecipeIngredientDto.prototype, "recipeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '612cb926a6effb11a4dbb963'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatedWeekRecipeIngredientDto.prototype, "ingredientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdatedWeekRecipeIngredientDto.prototype, "isDone", void 0);
exports.UpdatedWeekRecipeIngredientDto = UpdatedWeekRecipeIngredientDto;
exports.UserListsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    lists: { type: [{ _id: String, listName: String, itemCounter: Number, listPictureUrl: String }] }
});
//# sourceMappingURL=list.model.js.map