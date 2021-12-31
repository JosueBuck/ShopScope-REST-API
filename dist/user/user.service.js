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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_service_1 = require("../auth/auth.service");
const lists_service_1 = require("../lists/lists.service");
const recipes_service_1 = require("../recipes/recipes.service");
const weeks_service_1 = require("../weeks/weeks.service");
let UserService = class UserService {
    constructor(userModel, recipeService, listsService, weeksService, authService) {
        this.userModel = userModel;
        this.recipeService = recipeService;
        this.listsService = listsService;
        this.weeksService = weeksService;
        this.authService = authService;
    }
    async createNewUser(userRegisterData) {
        const newUser = new this.userModel({
            firstname: userRegisterData.firstname,
            lastname: userRegisterData.lastname,
            username: userRegisterData.username,
            password: userRegisterData.password,
            email: userRegisterData.email,
        });
        await this.recipeService.createNewUserRecipeModel(newUser.id);
        await this.listsService.createNewUserListsModel(newUser.id);
        await this.weeksService.createNewUserWeeksModel(newUser.id);
        try {
            await newUser.save();
            return newUser;
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteUser(userId) {
        await this.findUserById(userId);
        await this.weeksService.getUserWeek(userId);
        const simplifiedUserRecipesObject = await this.recipeService.getSimplifiedUserRecipesByUserId(userId);
        const simplifiedUserListsObject = await this.listsService.getSimplifiedUserListsByUserId(userId);
        const simplifiedLists = simplifiedUserListsObject.lists;
        const simplifiedRecipes = simplifiedUserRecipesObject.recipes;
        try {
            await this.listsService.deleteManyLists(simplifiedLists);
            await this.recipeService.deleteManyRecipes(simplifiedRecipes);
            await this.listsService.deleteUserListsModel(userId);
            await this.recipeService.deleteUserRecipeModel(userId);
            await this.weeksService.deleteUserWeeksModel(userId);
            await this.userModel.deleteOne({ _id: userId });
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
        return { message: 'Deleted', responseData: userId, statusCode: 200 };
    }
    async findUserByName(username) {
        let user;
        try {
            user = await this.userModel.findOne({ username: new RegExp('^' + username + '$', "i") });
            ;
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException('A problem occured while trying to find the user.');
        }
        return user;
    }
    async findUserById(userId) {
        let user;
        try {
            user = await this.userModel.findOne({ _id: userId }).exec();
        }
        catch (_a) {
            throw new common_1.NotFoundException('Invalid user id.');
        }
        if (!user) {
            throw new common_1.NotFoundException('No user with this id.');
        }
        return user;
    }
    async loginUser(loginData) {
        const user = await this.findUserByName(loginData.username);
        if (!user) {
            throw new common_1.NotFoundException('Wrong username or password.');
        }
        const authenticationResponse = await this.authService.authenticateUser(loginData, user);
        user.password = 'xxxx';
        const successfullLoginData = {
            user: user,
            jwt: authenticationResponse
        };
        return { message: 'Created', responseData: successfullLoginData, statusCode: 201 };
    }
    async registerUser(registerData) {
        const existingUsers = await this.findUserByName(registerData.username);
        if (existingUsers) {
            throw new common_1.ConflictException('User with this username already exists.');
        }
        const hashedPassword = await this.authService.hashPassword(registerData.password);
        const userRegisterData = {
            firstname: registerData.firstname,
            lastname: registerData.lastname,
            username: registerData.username,
            password: hashedPassword,
            email: registerData.email
        };
        const newUser = await this.createNewUser(userRegisterData);
        newUser.password = 'xxxx';
        const userPayloadData = {
            _id: newUser.id,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            username: newUser.username,
            email: newUser.email
        };
        const jwt = await this.authService.generateJWT({ userPayloadData });
        return { message: 'Created', responseData: { newUser, jwt }, statusCode: 201 };
    }
    async updateUserInformations(userId, updatedUser) {
        const user = await this.findUserById(userId);
        user.firstname = updatedUser.firstname;
        user.lastname = updatedUser.lastname;
        user.email = updatedUser.email;
        try {
            await user.save();
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException('A problem occured while processing the api call');
        }
        user.password = 'xxxx';
        return { message: 'OK', responseData: user, statusCode: 200 };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        recipes_service_1.RecipesService,
        lists_service_1.ListsService,
        weeks_service_1.WeeksService,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map