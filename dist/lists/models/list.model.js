"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListSchema = void 0;
const mongoose = require("mongoose");
exports.ListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    listItems: { type: [{ name: String, amount: Number, unit: String, isDone: Boolean }], required: true },
});
//# sourceMappingURL=list.model.js.map