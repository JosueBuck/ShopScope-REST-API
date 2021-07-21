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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = require('bcrypt');
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async authenticateUser(loginData) {
        const user = await this.userService.findUserByName(loginData.username);
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
    async registerUser(registerData) {
        const existingUsers = await this.userService.findUserByName(registerData.username);
        if (existingUsers) {
            console.log("user with this name already exists!");
            return false;
        }
        const hashedPassword = await this.hashPassword(registerData.password);
        const userRegisterData = {
            username: registerData.username,
            password: hashedPassword,
            email: registerData.email
        };
        const newUser = await this.userService.createNewUser(userRegisterData);
        return { message: "User is now registered.", user: { username: newUser.username, email: newUser.email }, status: 200 };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map