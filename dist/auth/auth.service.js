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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require('bcrypt');
let AuthService = class AuthService {
    constructor(jwtService, userModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async authenticateUser(loginData) {
        const user = await this.findUser(loginData.username);
        if (!user) {
            console.log("No user with this username");
            return false;
        }
        console.log(user);
        const comparePasswordsResult = await this.comparePasswords(loginData.password, user.password);
        console.log(comparePasswordsResult);
        if (comparePasswordsResult) {
            return this.generateJWT({ user });
        }
        else {
            return false;
        }
    }
    async generateJWT(payload) {
        return await this.jwtService.signAsync(payload);
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 12);
    }
    async comparePasswords(newPassword, passwordHash) {
        return await bcrypt.compare(newPassword, passwordHash);
    }
    async findUser(username) {
        const user = await this.userModel.findOne({ username: username }).exec();
        return user;
    }
    async registerUser(registerData) {
        const existingUsers = await this.userModel.find({ username: new RegExp('^' + registerData.username + '$', "i") });
        if (existingUsers.length >= 1) {
            console.log("user with this name already exists!");
            return false;
        }
        const hashedPassword = await this.hashPassword(registerData.password);
        const newUser = new this.userModel({ username: registerData.username, password: hashedPassword, email: registerData.email });
        await newUser.save();
        return true;
    }
    async deleteUser(username) {
        await this.userModel.deleteOne({ username: username });
        return username;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(1, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map