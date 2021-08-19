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
exports.UserRecipesSchema = exports.RecipeTypeDto = exports.UpdatedRecipeDto = exports.IngredientDto = exports.NewIngredientDto = exports.NewRecipeDto = exports.RecipeSchema = exports.RecipeType = void 0;
const mongoose = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const list_model_1 = require("../../lists/models/list.model");
var RecipeType;
(function (RecipeType) {
    RecipeType["VEGETARIAN"] = "VEGETARIAN";
    RecipeType["VEGAN"] = "VEGAN";
    RecipeType["BREAKFAST"] = "BREAKFAST";
    RecipeType["FASTFOOD"] = "FASTFOOD";
    RecipeType["HOMECOOKED"] = "HOMECOOKED";
    RecipeType["ONEPOT"] = "ONEPOT";
    RecipeType["DESSERT"] = "DESSERT";
    RecipeType["DRINKS"] = "DRINKS";
})(RecipeType = exports.RecipeType || (exports.RecipeType = {}));
exports.RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    recipeType: [{ type: String, required: true }],
    cookingTime: { type: Number, required: true },
    description: { type: String, required: true },
    ingredients: { type: [{ name: String, amount: Number, unit: String, itemType: String }], required: true },
    instructions: [{ type: String, required: true }]
});
class NewRecipeDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], NewRecipeDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsEnum(RecipeType, { each: true }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    class_validator_1.ArrayMinSize(1),
    class_validator_1.ArrayUnique(),
    __metadata("design:type", Array)
], NewRecipeDto.prototype, "recipeType", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], NewRecipeDto.prototype, "cookingTime", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], NewRecipeDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.ArrayMinSize(2),
    class_transformer_1.Type(() => NewIngredientDto),
    __metadata("design:type", Array)
], NewRecipeDto.prototype, "ingredients", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.IsString({ each: true }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.ArrayMinSize(1),
    __metadata("design:type", Array)
], NewRecipeDto.prototype, "instructions", void 0);
exports.NewRecipeDto = NewRecipeDto;
class NewIngredientDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], NewIngredientDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], NewIngredientDto.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], NewIngredientDto.prototype, "unit", void 0);
__decorate([
    class_validator_1.IsEnum(list_model_1.ItemType),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], NewIngredientDto.prototype, "itemType", void 0);
exports.NewIngredientDto = NewIngredientDto;
class IngredientDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], IngredientDto.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], IngredientDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], IngredientDto.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], IngredientDto.prototype, "unit", void 0);
exports.IngredientDto = IngredientDto;
class UpdatedRecipeDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatedRecipeDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatedRecipeDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsEnum(RecipeType, { each: true }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    class_validator_1.ArrayMinSize(1),
    class_validator_1.ArrayUnique(),
    __metadata("design:type", Array)
], UpdatedRecipeDto.prototype, "recipeType", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], UpdatedRecipeDto.prototype, "cookingTime", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatedRecipeDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.ArrayMinSize(2),
    class_transformer_1.Type(() => IngredientDto),
    __metadata("design:type", Array)
], UpdatedRecipeDto.prototype, "ingredients", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.IsString({ each: true }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.ArrayMinSize(1),
    __metadata("design:type", Array)
], UpdatedRecipeDto.prototype, "instructions", void 0);
exports.UpdatedRecipeDto = UpdatedRecipeDto;
class RecipeTypeDto {
}
__decorate([
    class_validator_1.IsEnum(RecipeType, { each: true }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    class_validator_1.ArrayMinSize(1),
    class_validator_1.ArrayUnique(),
    __metadata("design:type", Array)
], RecipeTypeDto.prototype, "recipeType", void 0);
exports.RecipeTypeDto = RecipeTypeDto;
exports.UserRecipesSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    recipes: { type: [{ _id: String, recipeName: String, recipeType: [String] }] }
});
//# sourceMappingURL=recipe.model.js.map