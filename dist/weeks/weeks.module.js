"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeksModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const week_model_1 = require("./models/week.model");
const weeks_controller_1 = require("./weeks.controller");
const weeks_service_1 = require("./weeks.service");
const lists_module_1 = require("../lists/lists.module");
let WeeksModule = class WeeksModule {
};
WeeksModule = __decorate([
    common_1.Module({
        imports: [
            lists_module_1.ListsModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'UserWeek', schema: week_model_1.UserWeekSchema }])
        ],
        controllers: [weeks_controller_1.WeeksController],
        providers: [weeks_service_1.WeeksService],
        exports: [weeks_service_1.WeeksService]
    })
], WeeksModule);
exports.WeeksModule = WeeksModule;
//# sourceMappingURL=weeks.module.js.map