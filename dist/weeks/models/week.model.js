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
exports.UserDayRecipeDataDto = exports.NewUserDayRecipeDataDto = exports.UserDayRecipeDto = exports.NewUserDayRecipeDto = exports.UserWeekSchema = void 0;
const openapi = require("@nestjs/swagger");
const mongoose = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const list_model_1 = require("../../lists/models/list.model");
const swagger_1 = require("@nestjs/swagger");
exports.UserWeekSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    week: { type: [
            {
                name: String,
                breakfast: { type: [{ recipeName: String, garnish: String, recipeId: String, ingredients: { type: [{ name: String, amount: Number, unit: String, itemType: String, isDone: Boolean }] }, recipePictureUrl: String }] },
                lunch: { type: [{ recipeName: String, garnish: String, recipeId: String, ingredients: { type: [{ name: String, amount: Number, unit: String, itemType: String, isDone: Boolean }] }, recipePictureUrl: String }] },
                dinner: { type: [{ recipeName: String, garnish: String, recipeId: String, ingredients: { type: [{ name: String, amount: Number, unit: String, itemType: String, isDone: Boolean }] }, recipePictureUrl: String }] },
            }
        ]
    }
});
class NewUserDayRecipeDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { recipeName: { required: true, type: () => String }, garnish: { required: true, type: () => String }, ingredients: { required: true, type: () => [require("../../lists/models/list.model").NewListItemDto] }, recipePictureUrl: { required: true, type: () => String } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        description: 'Recipe name',
        example: 'testRecipe'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], NewUserDayRecipeDto.prototype, "recipeName", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Garnish name',
        example: 'testGarnish'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], NewUserDayRecipeDto.prototype, "garnish", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.ArrayMinSize(1),
    class_transformer_1.Type(() => list_model_1.NewListItemDto),
    __metadata("design:type", Array)
], NewUserDayRecipeDto.prototype, "ingredients", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'testUrl'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], NewUserDayRecipeDto.prototype, "recipePictureUrl", void 0);
exports.NewUserDayRecipeDto = NewUserDayRecipeDto;
class UserDayRecipeDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { _id: { required: true, type: () => String }, recipeName: { required: true, type: () => String }, garnish: { required: true, type: () => String }, ingredients: { required: true, type: () => [require("../../lists/models/list.model").ListItemDto] }, recipePictureUrl: { required: true, type: () => String } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        description: 'Recipe id',
        example: '612cb926a6effb11a4dbb962'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserDayRecipeDto.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Recipe name',
        example: 'testRecipe'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserDayRecipeDto.prototype, "recipeName", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Garnish name',
        example: 'testGarnish'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserDayRecipeDto.prototype, "garnish", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.ArrayMinSize(1),
    class_transformer_1.Type(() => list_model_1.ListItemDto),
    __metadata("design:type", Array)
], UserDayRecipeDto.prototype, "ingredients", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'testUrl'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserDayRecipeDto.prototype, "recipePictureUrl", void 0);
exports.UserDayRecipeDto = UserDayRecipeDto;
class NewUserDayRecipeDataDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { dayId: { required: true, type: () => String }, type: { required: true, type: () => String }, recipe: { required: true, type: () => require("./week.model").NewUserDayRecipeDto } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        description: 'Id of a day',
        example: '612caa8c026d490b4b4c8d02'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], NewUserDayRecipeDataDto.prototype, "dayId", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Defines what type of meal this is',
        example: 'lunch'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], NewUserDayRecipeDataDto.prototype, "type", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => NewUserDayRecipeDto),
    __metadata("design:type", NewUserDayRecipeDto)
], NewUserDayRecipeDataDto.prototype, "recipe", void 0);
exports.NewUserDayRecipeDataDto = NewUserDayRecipeDataDto;
class UserDayRecipeDataDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { dayId: { required: true, type: () => String }, type: { required: true, type: () => String }, recipe: { required: true, type: () => require("./week.model").UserDayRecipeDto } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        description: 'Id of a day',
        example: '612caa8c026d490b4b4c8d02'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserDayRecipeDataDto.prototype, "dayId", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Defines what type of meal this is',
        example: 'lunch'
    }),
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
//# sourceMappingURL=week.model.js.map