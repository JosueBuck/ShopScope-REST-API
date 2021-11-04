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
const openapi = require("@nestjs/swagger");
const mongoose = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const list_model_1 = require("../../lists/models/list.model");
const swagger_1 = require("@nestjs/swagger");
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
    RecipeType["OTHERS"] = "OTHERS";
})(RecipeType = exports.RecipeType || (exports.RecipeType = {}));
exports.RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    garnish: { type: String, required: true },
    recipeType: [{ type: String, required: true }],
    cookingTime: { type: Number, required: true },
    description: { type: String, required: true },
    ingredients: { type: [{ name: String, amount: Number, unit: String, itemType: String }], required: true },
    instructions: [{ type: String, required: true }],
    recipePictureUrl: { type: String, required: true }
});
class NewRecipeDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, garnish: { required: true, type: () => String }, recipeType: { required: true, enum: require("./recipe.model").RecipeType, isArray: true }, cookingTime: { required: true, type: () => Number }, description: { required: true, type: () => String }, ingredients: { required: true, type: () => [require("./recipe.model").NewIngredientDto] }, instructions: { required: true, type: () => [String] }, recipePictureUrl: { required: true, type: () => String } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'testRecipe'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], NewRecipeDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'testGarnish'
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], NewRecipeDto.prototype, "garnish", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [RecipeType.BREAKFAST, RecipeType.VEGAN]
    }),
    class_validator_1.IsEnum(RecipeType, { each: true }),
    class_validator_1.IsArray(),
    class_validator_1.ArrayUnique(),
    __metadata("design:type", Array)
], NewRecipeDto.prototype, "recipeType", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 30
    }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], NewRecipeDto.prototype, "cookingTime", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'This is a test desciption'
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], NewRecipeDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.ArrayMinSize(1),
    class_transformer_1.Type(() => NewIngredientDto),
    __metadata("design:type", Array)
], NewRecipeDto.prototype, "ingredients", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: ['Instruction 1', 'Instruction 2']
    }),
    class_validator_1.IsArray(),
    class_validator_1.IsString({ each: true }),
    __metadata("design:type", Array)
], NewRecipeDto.prototype, "instructions", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'testUrl'
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], NewRecipeDto.prototype, "recipePictureUrl", void 0);
exports.NewRecipeDto = NewRecipeDto;
class NewIngredientDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, amount: { required: true, type: () => Number }, unit: { required: true, type: () => String }, itemType: { required: true, enum: require("../../lists/models/list.model").ItemType } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'testIngredient'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], NewIngredientDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 1
    }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], NewIngredientDto.prototype, "amount", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'testUnit'
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], NewIngredientDto.prototype, "unit", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: list_model_1.ItemType.SNACKS
    }),
    class_validator_1.IsEnum(list_model_1.ItemType),
    __metadata("design:type", String)
], NewIngredientDto.prototype, "itemType", void 0);
exports.NewIngredientDto = NewIngredientDto;
class IngredientDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { _id: { required: true, type: () => String }, name: { required: true, type: () => String }, amount: { required: true, type: () => Number }, unit: { required: true, type: () => String }, itemType: { required: true, enum: require("../../lists/models/list.model").ItemType } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        description: 'Ingredient id',
        example: 'This is a test description'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsMongoId(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], IngredientDto.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Ingredient name',
        example: 'updatedIngredientName'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], IngredientDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Ingredient amount',
        example: '1'
    }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], IngredientDto.prototype, "amount", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Ingredient amount unit',
        example: 'updatedTestUnit'
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], IngredientDto.prototype, "unit", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Ingredient type',
        example: list_model_1.ItemType.SNACKS
    }),
    class_validator_1.IsEnum(list_model_1.ItemType),
    __metadata("design:type", String)
], IngredientDto.prototype, "itemType", void 0);
exports.IngredientDto = IngredientDto;
class UpdatedRecipeDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, garnish: { required: true, type: () => String }, recipeType: { required: true, enum: require("./recipe.model").RecipeType, isArray: true }, cookingTime: { required: true, type: () => Number }, description: { required: true, type: () => String }, ingredients: { required: true, type: () => [require("./recipe.model").IngredientDto] }, instructions: { required: true, type: () => [String] }, recipePictureUrl: { required: true, type: () => String } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        description: 'Recipe id',
        example: '612d0b3cd963d505785851dd'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsMongoId(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatedRecipeDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Name of the recipe',
        example: 'updatedTestRecipe'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatedRecipeDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'testGarnish'
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdatedRecipeDto.prototype, "garnish", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Recipe Type',
        example: RecipeType.FASTFOOD
    }),
    class_validator_1.IsEnum(RecipeType, { each: true }),
    class_validator_1.IsArray(),
    class_validator_1.ArrayUnique(),
    __metadata("design:type", Array)
], UpdatedRecipeDto.prototype, "recipeType", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Recipe cooking Time',
        example: 20
    }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UpdatedRecipeDto.prototype, "cookingTime", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Recipe description',
        example: 'This is a test description'
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdatedRecipeDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.ArrayMinSize(1),
    class_transformer_1.Type(() => IngredientDto),
    __metadata("design:type", Array)
], UpdatedRecipeDto.prototype, "ingredients", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Recipe instructions',
        example: ['Updated instruction 1', 'Updated instruction 2']
    }),
    class_validator_1.IsArray(),
    class_validator_1.IsString({ each: true }),
    __metadata("design:type", Array)
], UpdatedRecipeDto.prototype, "instructions", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'www.nicepics.com/recipePicture01'
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdatedRecipeDto.prototype, "recipePictureUrl", void 0);
exports.UpdatedRecipeDto = UpdatedRecipeDto;
class RecipeTypeDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { recipeType: { required: true, enum: require("./recipe.model").RecipeType, isArray: true } };
    }
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
    recipes: { type: [{ _id: String, recipeName: String, garnish: String, cookingTime: Number, recipeType: [String], recipePictureUrl: String }] }
});
//# sourceMappingURL=recipe.model.js.map