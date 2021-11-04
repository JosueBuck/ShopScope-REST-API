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
exports.UpdatedUserDto = exports.RegisterDataDto = exports.LoginDataDto = exports.UserSchema = void 0;
const openapi = require("@nestjs/swagger");
const mongoose = require("mongoose");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
exports.UserSchema = new mongoose.Schema({
    firstname: { type: String, requeired: true },
    lastname: { type: String, requeired: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
});
class LoginDataDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, password: { required: true, type: () => String } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        description: 'Name of a user',
        example: 'TestUser'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LoginDataDto.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Password of a user',
        example: 'TestPassword'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LoginDataDto.prototype, "password", void 0);
exports.LoginDataDto = LoginDataDto;
class RegisterDataDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { firstname: { required: true, type: () => String }, lastname: { required: true, type: () => String }, username: { required: true, type: () => String }, password: { required: true, type: () => String }, email: { required: true, type: () => String } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        description: 'First name of a user',
        example: 'Hans'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterDataDto.prototype, "firstname", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Last name of a user',
        example: 'Müller'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterDataDto.prototype, "lastname", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Name of a user',
        example: 'TestUser'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterDataDto.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Password of a user',
        example: 'TestPassword'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterDataDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Email of a user',
        example: 'testUser@mail.com'
    }),
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterDataDto.prototype, "email", void 0);
exports.RegisterDataDto = RegisterDataDto;
class UpdatedUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { _id: { required: true, type: () => String }, firstname: { required: true, type: () => String }, lastname: { required: true, type: () => String }, username: { required: true, type: () => String }, password: { required: true, type: () => String }, email: { required: true, type: () => String } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        description: 'Id of a user',
        example: '612caa8c026d490b4b4c8cfc'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsMongoId(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatedUserDto.prototype, "_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'First name of a user',
        example: 'Hans'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatedUserDto.prototype, "firstname", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Last name of a user',
        example: 'Müller'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatedUserDto.prototype, "lastname", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Name of a user',
        example: 'TestUser'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatedUserDto.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Password of a user',
        example: 'TestPassword'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatedUserDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Email of a user',
        example: 'testUser@mail.com'
    }),
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatedUserDto.prototype, "email", void 0);
exports.UpdatedUserDto = UpdatedUserDto;
//# sourceMappingURL=user.model.js.map