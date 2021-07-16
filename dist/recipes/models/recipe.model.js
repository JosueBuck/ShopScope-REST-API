"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeSchema = void 0;
const mongoose = require("mongoose");
exports.RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    recipeType: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    description: { type: String, required: true },
    ingredients: { type: [{ _id: false, name: String, amount: Number, unit: String }], required: true },
    instructions: [{ type: String, required: true }]
});
//# sourceMappingURL=recipe.model.js.map