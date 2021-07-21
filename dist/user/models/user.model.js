"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWeekSchema = exports.UserListsSchema = exports.UserRecipesSchema = exports.UserSchema = void 0;
const mongoose = require("mongoose");
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
//# sourceMappingURL=user.model.js.map