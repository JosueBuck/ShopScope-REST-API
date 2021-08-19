"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const list_model_1 = require("./models/list.model");
const lists_controller_1 = require("./lists.controller");
const lists_service_1 = require("./lists.service");
const user_module_1 = require("../user/user.module");
let ListsModule = class ListsModule {
};
ListsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'List', schema: list_model_1.ListSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'UserLists', schema: list_model_1.UserListsSchema }]),
        ],
        controllers: [lists_controller_1.ListsController],
        providers: [lists_service_1.ListsService],
        exports: [lists_service_1.ListsService]
    })
], ListsModule);
exports.ListsModule = ListsModule;
//# sourceMappingURL=lists.module.js.map