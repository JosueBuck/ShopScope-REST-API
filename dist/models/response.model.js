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
exports.DeleteListItemResponse = exports.UpdateListItemResponse = exports.AddListItemResponse = exports.UpdateWeekRecipeIngredientInList = exports.RemoveWeekRecipeFromListResponse = exports.AddWeekRecipesToList = exports.DeleteListResponse = exports.GetListResponse = exports.GetSimplifiedUserListsResponse = exports.CreateListResponse = exports.DeleteRecipeResponse = exports.GetRecipeResponse = exports.getSimplifiedUserRecipesOfRecipeTypeResponse = exports.GetSimplifiedUserRecipesResponse = exports.UpdateRecipeResponse = exports.CreateRecipeResponse = exports.RemoveAllRecipesFromWeekResponse = exports.RemoveRecipeFromDayResponse = exports.AddRecipeToDayResponse = exports.GetUserWeekResponse = exports.UpdateUserInformationsResponse = exports.DeleteUserResponse = exports.RegisterResponse = exports.LoginResponse = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const list_model_1 = require("../lists/models/list.model");
const recipe_model_1 = require("../recipes/models/recipe.model");
const user_model_1 = require("../user/models/user.model");
const week_model_1 = require("../weeks/models/week.model");
class LoginResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'Created'
    }),
    __metadata("design:type", String)
], LoginResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            'user': { '_id': '612caa8c026d490b4b4c8cfc', 'firstname': 'Hans', 'lastname': 'Müller', 'username': 'Username', 'password': 'xxxx', 'email': 'user@mail.com', '__v': 0
            },
            'jwt': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUGF5bG9hZERhdGEiOnsiX2lkIjoiNjEzMGQ2MjFhMzgzNTkwYzA1MWM3YTM4IiwiZmlyc3RuYW1lIjoiSGFucyIsImxhc3RuYW1lIjoiTcO8bGxlciIsInVzZXJuYW1lIjoidGVzdHVzZXIxIiwiZW1haWwiOiJ0ZXN0bWFpbEBtYWlsLmNvbSJ9LCJpYXQiOjE2MzA1OTA1MTAsImV4cCI6MTYzMDY5MDUxMH0._p24_f79s8EE_XP0jg1Px0dtiiDF5NW-TTcVGn4jHH4'
        }
    }),
    __metadata("design:type", Object)
], LoginResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 201
    }),
    __metadata("design:type", Number)
], LoginResponse.prototype, "statusCode", void 0);
exports.LoginResponse = LoginResponse;
class RegisterResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'Created'
    }),
    __metadata("design:type", String)
], RegisterResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: { '_id': '612caa8c026d490b4b4c8cfc', 'firstname': 'Hans', 'lastname': 'Müller', 'username': 'Username', 'password': 'xxxx', 'email': 'user@mail.com', '__v': 0 }
    }),
    __metadata("design:type", Object)
], RegisterResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 201
    }),
    __metadata("design:type", Number)
], RegisterResponse.prototype, "statusCode", void 0);
exports.RegisterResponse = RegisterResponse;
class DeleteUserResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => String }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], DeleteUserResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '612caa8c026d490b4b4c8cfc'
    }),
    __metadata("design:type", String)
], DeleteUserResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], DeleteUserResponse.prototype, "statusCode", void 0);
exports.DeleteUserResponse = DeleteUserResponse;
class UpdateUserInformationsResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], UpdateUserInformationsResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: { '_id': '612caa8c026d490b4b4c8cfc', 'firstname': 'Hans', 'lastname': 'Müller', 'username': 'Username', 'password': 'xxxx', 'email': 'user@mail.com', '__v': 0 }
    }),
    __metadata("design:type", Object)
], UpdateUserInformationsResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], UpdateUserInformationsResponse.prototype, "statusCode", void 0);
exports.UpdateUserInformationsResponse = UpdateUserInformationsResponse;
class GetUserWeekResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], GetUserWeekResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            '_id': '612caa8c026d490b4b4c8d01',
            'userId': '612caa8c026d490b4b4c8cfc',
            'week': [
                {
                    '_id': '612caa8c026d490b4b4c8d02',
                    'name': 'monday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d03',
                    'name': 'tuesday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d04',
                    'name': 'wednesday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d05',
                    'name': 'thursday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d06',
                    'name': 'friday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d07',
                    'name': 'saturday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d08',
                    'name': 'sunday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                }
            ],
            '__v': 0
        }
    }),
    __metadata("design:type", Object)
], GetUserWeekResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], GetUserWeekResponse.prototype, "statusCode", void 0);
exports.GetUserWeekResponse = GetUserWeekResponse;
class AddRecipeToDayResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], AddRecipeToDayResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            '_id': '612caa8c026d490b4b4c8d01',
            'userId': '612caa8c026d490b4b4c8cfc',
            'week': [
                {
                    '_id': '612caa8c026d490b4b4c8d02',
                    'name': 'monday',
                    'breakfast': [],
                    'lunch': [
                        {
                            '_id': '612cb926a6effb11a4dbb962',
                            'recipeName': 'testRecipe5',
                            'garnish': 'testGarnish',
                            'ingredients': [
                                {
                                    '_id': '612cb926a6effb11a4dbb963',
                                    'name': 'testIngredient',
                                    'amount': 1,
                                    'unit': 'testUnit',
                                    'itemType': 'SNACKS',
                                    'isDone': false
                                }
                            ],
                            'recipePictureUrl': 'testUrl',
                        }
                    ],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d03',
                    'name': 'tuesday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d04',
                    'name': 'wednesday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d05',
                    'name': 'thursday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d06',
                    'name': 'friday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d07',
                    'name': 'saturday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d08',
                    'name': 'sunday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                }
            ],
            '__v': 1
        }
    }),
    __metadata("design:type", Object)
], AddRecipeToDayResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], AddRecipeToDayResponse.prototype, "statusCode", void 0);
exports.AddRecipeToDayResponse = AddRecipeToDayResponse;
class RemoveRecipeFromDayResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], RemoveRecipeFromDayResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            '_id': '612caa8c026d490b4b4c8d01',
            'userId': '612caa8c026d490b4b4c8cfc',
            'week': [
                {
                    '_id': '612caa8c026d490b4b4c8d02',
                    'name': 'monday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d03',
                    'name': 'tuesday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d04',
                    'name': 'wednesday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d05',
                    'name': 'thursday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d06',
                    'name': 'friday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d07',
                    'name': 'saturday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d08',
                    'name': 'sunday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                }
            ],
            '__v': 2
        }
    }),
    __metadata("design:type", Object)
], RemoveRecipeFromDayResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], RemoveRecipeFromDayResponse.prototype, "statusCode", void 0);
exports.RemoveRecipeFromDayResponse = RemoveRecipeFromDayResponse;
class RemoveAllRecipesFromWeekResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], RemoveAllRecipesFromWeekResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            '_id': '612caa8c026d490b4b4c8d01',
            'userId': '612caa8c026d490b4b4c8cfc',
            'week': [
                {
                    '_id': '612caa8c026d490b4b4c8d02',
                    'name': 'monday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d03',
                    'name': 'tuesday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d04',
                    'name': 'wednesday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d05',
                    'name': 'thursday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d06',
                    'name': 'friday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d07',
                    'name': 'saturday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                },
                {
                    '_id': '612caa8c026d490b4b4c8d08',
                    'name': 'sunday',
                    'breakfast': [],
                    'lunch': [],
                    'dinner': []
                }
            ],
            '__v': 4
        }
    }),
    __metadata("design:type", Object)
], RemoveAllRecipesFromWeekResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], RemoveAllRecipesFromWeekResponse.prototype, "statusCode", void 0);
exports.RemoveAllRecipesFromWeekResponse = RemoveAllRecipesFromWeekResponse;
class CreateRecipeResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'Created'
    }),
    __metadata("design:type", String)
], CreateRecipeResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            'recipeType': [
                'BREAKFAST',
                'VEGAN'
            ],
            'instructions': [
                'Instruction 1',
                'Instruction 2'
            ],
            '_id': '612d0b3cd963d505785851dd',
            'name': 'testRecipe',
            'garnish': 'testGarnish',
            'cookingTime': 30,
            'description': 'This is a test description',
            'ingredients': [
                {
                    '_id': '612d0b3cd963d505785851de',
                    'name': 'testIngredient',
                    'amount': 1,
                    'unit': 'testUnit',
                    'itemType': 'SNACKS'
                }
            ],
            'recipePictureUrl': 'testUrl',
            '__v': 0
        }
    }),
    __metadata("design:type", Object)
], CreateRecipeResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 201
    }),
    __metadata("design:type", Number)
], CreateRecipeResponse.prototype, "statusCode", void 0);
exports.CreateRecipeResponse = CreateRecipeResponse;
class UpdateRecipeResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], UpdateRecipeResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            'recipeType': [
                'FASTFOOD'
            ],
            'instructions': [
                'Updated instruction 1',
                'Updated instruction 2'
            ],
            '_id': '612d0b3cd963d505785851dd',
            'name': 'updatedRecipe',
            'garnish': 'updatedGarnish',
            'cookingTime': 20,
            'description': 'This is a test description',
            'ingredients': [
                {
                    '_id': '611d2dc9fc63e719c3fbdc45',
                    'name': 'updatedIngredientName',
                    'amount': 1,
                    'unit': 'updatedTestUnit',
                    'itemType': 'SNACKS'
                }
            ],
            'recipePictureUrl': 'testUrl',
            '__v': 1
        }
    }),
    __metadata("design:type", Object)
], UpdateRecipeResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], UpdateRecipeResponse.prototype, "statusCode", void 0);
exports.UpdateRecipeResponse = UpdateRecipeResponse;
class GetSimplifiedUserRecipesResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => [Object] }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], GetSimplifiedUserRecipesResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [
            {
                'recipeType': [
                    'FASTFOOD'
                ],
                '_id': '612d0b3cd963d505785851dd',
                'recipeName': 'testRecipe',
                'garnish': 'testGarnish',
                'cookingTime': 30,
                'recipePictureUrl': 'testUrl'
            },
            {
                'recipeType': [
                    'FASTFOOD'
                ],
                '_id': '612d11228dafa20782cce9fa',
                'recipeName': 'testRecipe',
                'garnish': 'testGarnish',
                'cookingTime': 30,
                'recipePictureUrl': 'testUrl',
            }
        ]
    }),
    __metadata("design:type", Array)
], GetSimplifiedUserRecipesResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], GetSimplifiedUserRecipesResponse.prototype, "statusCode", void 0);
exports.GetSimplifiedUserRecipesResponse = GetSimplifiedUserRecipesResponse;
class getSimplifiedUserRecipesOfRecipeTypeResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], getSimplifiedUserRecipesOfRecipeTypeResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [
            {
                'recipeType': [
                    'BREAKFAST',
                    'VEGAN'
                ],
                'instructions': [
                    'Instruction 1',
                    'Instruction 2'
                ],
                '_id': '612d1cd0677c0c08912bae54',
                'name': 'testRecipe',
                'garnish': 'testGarnish',
                'cookingTime': 30,
                'description': 'This is a test description',
                'ingredients': [
                    {
                        '_id': '612d1cd0677c0c08912bae55',
                        'name': 'testIngredient',
                        'amount': 1,
                        'unit': 'testUnit',
                        'itemType': 'SNACKS'
                    }
                ],
                'recipePictureUrl': 'testUrl',
                '__v': 0
            }
        ]
    }),
    __metadata("design:type", Object)
], getSimplifiedUserRecipesOfRecipeTypeResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], getSimplifiedUserRecipesOfRecipeTypeResponse.prototype, "statusCode", void 0);
exports.getSimplifiedUserRecipesOfRecipeTypeResponse = getSimplifiedUserRecipesOfRecipeTypeResponse;
class GetRecipeResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], GetRecipeResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [
            {
                'recipeType': [
                    'BREAKFAST',
                    'VEGAN'
                ],
                'instructions': [
                    'Instruction 1',
                    'Instruction 2'
                ],
                '_id': '612d1cd0677c0c08912bae54',
                'name': 'testRecipe',
                'garnish': 'testGarnish',
                'cookingTime': 30,
                'description': 'This is a test description',
                'ingredients': [
                    {
                        '_id': '612d1cd0677c0c08912bae55',
                        'name': 'testIngredient',
                        'amount': 1,
                        'unit': 'testUnit',
                        'itemType': 'SNACKS'
                    }
                ],
                'recipePictureUrl': 'testUrl',
                '__v': 0
            }
        ]
    }),
    __metadata("design:type", Object)
], GetRecipeResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], GetRecipeResponse.prototype, "statusCode", void 0);
exports.GetRecipeResponse = GetRecipeResponse;
class DeleteRecipeResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], DeleteRecipeResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Id of the deleted recipe',
        type: String,
        example: '612d1cd0677c0c08912bae54'
    }),
    __metadata("design:type", Object)
], DeleteRecipeResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], DeleteRecipeResponse.prototype, "statusCode", void 0);
exports.DeleteRecipeResponse = DeleteRecipeResponse;
class CreateListResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'Created'
    }),
    __metadata("design:type", String)
], CreateListResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            'itemTypes': [
                'FRUITS',
                'VEGETABLE',
                'BAKEWAREPRODUCTS',
                'CANFOODPRODUCTS',
                'MEATPRODUCTS',
                'MILKPRODUCTS',
                'FROZENPRODUCTS',
                'ELECTRICALPRODUCTS',
                'HYGIENEPRODUCTS',
                'DRINKS',
                'SNACKS',
                'SWEETS'
            ],
            '_id': '612df114d5f15405daeb8b86',
            'name': 'testList',
            'description': 'This is a test description',
            'weekRecipes': [
                {
                    '_id': '612cb926a6effb11a4dbb962',
                    'recipeName': 'testRecipe',
                    'garnish': 'testGarnish',
                    'ingredients': [
                        {
                            '_id': '612cb926a6effb11a4dbb963',
                            'name': 'testIngredient',
                            'amount': 1,
                            'unit': 'testUnit',
                            'itemType': 'SNACKS',
                            'isDone': false
                        }
                    ],
                    'recipePictureUrl': 'testUrl'
                }
            ],
            'listItems': [
                {
                    '_id': '612df114d5f15405daeb8b89',
                    'name': 'testIngredient',
                    'amount': 1,
                    'unit': 'testUnit',
                    'itemType': 'SNACKS',
                    'isDone': false
                }
            ],
            'listPictureUrl': 'www.testUrl.com',
            '__v': 0
        }
    }),
    __metadata("design:type", Object)
], CreateListResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 201
    }),
    __metadata("design:type", Number)
], CreateListResponse.prototype, "statusCode", void 0);
exports.CreateListResponse = CreateListResponse;
class GetSimplifiedUserListsResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => [Object] }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], GetSimplifiedUserListsResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [
            {
                '_id': '612df114d5f15405daeb8b86',
                'listName': 'testList',
                'listPictureUrl': 'www.testUrl.com',
            }
        ]
    }),
    __metadata("design:type", Array)
], GetSimplifiedUserListsResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], GetSimplifiedUserListsResponse.prototype, "statusCode", void 0);
exports.GetSimplifiedUserListsResponse = GetSimplifiedUserListsResponse;
class GetListResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], GetListResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            'itemTypes': [
                'FRUITS',
                'VEGETABLE',
                'BAKEWAREPRODUCTS',
                'CANFOODPRODUCTS',
                'MEATPRODUCTS',
                'MILKPRODUCTS',
                'FROZENPRODUCTS',
                'ELECTRICALPRODUCTS',
                'HYGIENEPRODUCTS',
                'DRINKS',
                'SNACKS',
                'SWEETS'
            ],
            '_id': '612df114d5f15405daeb8b86',
            'name': 'testList',
            'description': 'This is a test description',
            'weekRecipes': [
                {
                    '_id': '612cb926a6effb11a4dbb962',
                    'recipeName': 'testRecipe',
                    'garnish': 'testGarnish',
                    'ingredients': [
                        {
                            '_id': '612cb926a6effb11a4dbb963',
                            'name': 'testIngredient',
                            'amount': 1,
                            'unit': 'testUnit',
                            'itemType': 'SNACKS',
                            'isDone': false
                        }
                    ],
                    'recipePictureUrl': 'testUrl'
                }
            ],
            'listItems': [
                {
                    '_id': '612df114d5f15405daeb8b89',
                    'name': 'testIngredient',
                    'amount': 1,
                    'unit': 'testUnit',
                    'itemType': 'SNACKS',
                    'isDone': false
                }
            ],
            'listPictureUrl': 'www.testUrl.com',
            '__v': 0
        }
    }),
    __metadata("design:type", Object)
], GetListResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], GetListResponse.prototype, "statusCode", void 0);
exports.GetListResponse = GetListResponse;
class DeleteListResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'Created'
    }),
    __metadata("design:type", String)
], DeleteListResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: String,
        example: '612df114d5f15405daeb8b86'
    }),
    __metadata("design:type", String)
], DeleteListResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], DeleteListResponse.prototype, "statusCode", void 0);
exports.DeleteListResponse = DeleteListResponse;
class AddWeekRecipesToList {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'Created'
    }),
    __metadata("design:type", String)
], AddWeekRecipesToList.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            'itemTypes': [
                'FRUITS',
                'VEGETABLE',
                'BAKEWAREPRODUCTS',
                'CANFOODPRODUCTS',
                'MEATPRODUCTS',
                'MILKPRODUCTS',
                'FROZENPRODUCTS',
                'ELECTRICALPRODUCTS',
                'HYGIENEPRODUCTS',
                'DRINKS',
                'SNACKS',
                'SWEETS'
            ],
            '_id': '612dfb35d270f6082b31c33d',
            'name': 'testList',
            'description': 'This is a test description',
            'weekRecipes': [
                {
                    '_id': '612cb926a6effb11a4dbb962',
                    'recipeName': 'testRecipe',
                    'garnish': 'testGarnish',
                    'ingredients': [
                        {
                            '_id': '612cb926a6effb11a4dbb963',
                            'name': 'testIngredient',
                            'amount': 1,
                            'unit': 'testUnit',
                            'itemType': 'SNACKS',
                            'isDone': false
                        }
                    ],
                    'recipePictureUrl': 'testUrl'
                }
            ],
            'listItems': [
                {
                    '_id': '612dfb35d270f6082b31c340',
                    'name': 'testIngredient',
                    'amount': 1,
                    'unit': 'testUnit',
                    'itemType': 'SNACKS',
                    'isDone': false
                }
            ],
            'listPictureUrl': 'www.testUrl.com',
            '__v': 1
        }
    }),
    __metadata("design:type", Object)
], AddWeekRecipesToList.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], AddWeekRecipesToList.prototype, "statusCode", void 0);
exports.AddWeekRecipesToList = AddWeekRecipesToList;
class RemoveWeekRecipeFromListResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], RemoveWeekRecipeFromListResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            'itemTypes': [
                'FRUITS',
                'VEGETABLE',
                'BAKEWAREPRODUCTS',
                'CANFOODPRODUCTS',
                'MEATPRODUCTS',
                'MILKPRODUCTS',
                'FROZENPRODUCTS',
                'ELECTRICALPRODUCTS',
                'HYGIENEPRODUCTS',
                'DRINKS',
                'SNACKS',
                'SWEETS'
            ],
            '_id': '612dfb35d270f6082b31c33d',
            'name': 'testList',
            'description': 'This is a test description',
            'weekRecipes': [],
            'listItems': [
                {
                    '_id': '612dfb35d270f6082b31c340',
                    'name': 'testIngredient',
                    'amount': 1,
                    'unit': 'testUnit',
                    'itemType': 'SNACKS',
                    'isDone': false
                }
            ],
            'listPictureUrl': 'www.testUrl.com',
            '__v': 2
        }
    }),
    __metadata("design:type", Object)
], RemoveWeekRecipeFromListResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], RemoveWeekRecipeFromListResponse.prototype, "statusCode", void 0);
exports.RemoveWeekRecipeFromListResponse = RemoveWeekRecipeFromListResponse;
class UpdateWeekRecipeIngredientInList {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], UpdateWeekRecipeIngredientInList.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            'itemTypes': [
                'FRUITS',
                'VEGETABLE',
                'BAKEWAREPRODUCTS',
                'CANFOODPRODUCTS',
                'MEATPRODUCTS',
                'MILKPRODUCTS',
                'FROZENPRODUCTS',
                'ELECTRICALPRODUCTS',
                'HYGIENEPRODUCTS',
                'DRINKS',
                'SNACKS',
                'SWEETS'
            ],
            '_id': '612dfb35d270f6082b31c33d',
            'name': 'testList',
            'description': 'This is a test description',
            'weekRecipes': [
                {
                    '_id': '612cb926a6effb11a4dbb962',
                    'recipeName': 'testRecipe',
                    'garnish': 'testGarnish',
                    'ingredients': [
                        {
                            '_id': '612cb926a6effb11a4dbb963',
                            'name': 'testIngredient',
                            'amount': 1,
                            'unit': 'testUnit',
                            'itemType': 'SNACKS',
                            'isDone': true
                        }
                    ],
                    'recipePictureUrl': 'testUrl'
                }
            ],
            'listItems': [
                {
                    '_id': '612dfb35d270f6082b31c340',
                    'name': 'testIngredient',
                    'amount': 1,
                    'unit': 'testUnit',
                    'itemType': 'SNACKS',
                    'isDone': false
                }
            ],
            'listPictureUrl': 'www.testUrl.com',
            '__v': 3
        }
    }),
    __metadata("design:type", Object)
], UpdateWeekRecipeIngredientInList.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], UpdateWeekRecipeIngredientInList.prototype, "statusCode", void 0);
exports.UpdateWeekRecipeIngredientInList = UpdateWeekRecipeIngredientInList;
class AddListItemResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'Created'
    }),
    __metadata("design:type", String)
], AddListItemResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            'itemTypes': [
                'FRUITS',
                'VEGETABLE',
                'BAKEWAREPRODUCTS',
                'CANFOODPRODUCTS',
                'MEATPRODUCTS',
                'MILKPRODUCTS',
                'FROZENPRODUCTS',
                'ELECTRICALPRODUCTS',
                'HYGIENEPRODUCTS',
                'DRINKS',
                'SNACKS',
                'SWEETS'
            ],
            '_id': '612dfb35d270f6082b31c33d',
            'name': 'testList',
            'description': 'This is a test description',
            'weekRecipes': [
                {
                    '_id': '612cb926a6effb11a4dbb962',
                    'recipeName': 'testRecipe',
                    'garnish': 'testGarnish',
                    'ingredients': [
                        {
                            '_id': '612cb926a6effb11a4dbb963',
                            'name': 'testIngredient',
                            'amount': 1,
                            'unit': 'testUnit',
                            'itemType': 'SNACKS',
                            'isDone': true
                        }
                    ],
                    'recipePictureUrl': 'testUrl'
                }
            ],
            'listItems': [
                {
                    '_id': '612e0a9e6269850c22d365e6',
                    'name': 'testIngredient',
                    'amount': 1,
                    'unit': 'testUnit',
                    'itemType': 'SNACKS',
                    'isDone': false
                }
            ],
            'listPictureUrl': 'www.testUrl.com',
            '__v': 4
        }
    }),
    __metadata("design:type", Object)
], AddListItemResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 201
    }),
    __metadata("design:type", Number)
], AddListItemResponse.prototype, "statusCode", void 0);
exports.AddListItemResponse = AddListItemResponse;
class UpdateListItemResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], UpdateListItemResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            'itemTypes': [
                'FRUITS',
                'VEGETABLE',
                'BAKEWAREPRODUCTS',
                'CANFOODPRODUCTS',
                'MEATPRODUCTS',
                'MILKPRODUCTS',
                'FROZENPRODUCTS',
                'ELECTRICALPRODUCTS',
                'HYGIENEPRODUCTS',
                'DRINKS',
                'SNACKS',
                'SWEETS'
            ],
            '_id': '612dfb35d270f6082b31c33d',
            'name': 'testList',
            'description': 'This is a test description',
            'weekRecipes': [
                {
                    '_id': '612cb926a6effb11a4dbb962',
                    'recipeName': 'testRecipe',
                    'garnish': 'testGarnish',
                    'ingredients': [
                        {
                            '_id': '612cb926a6effb11a4dbb963',
                            'name': 'testIngredient',
                            'amount': 1,
                            'unit': 'testUnit',
                            'itemType': 'SNACKS',
                            'isDone': true
                        }
                    ],
                    'recipePictureUrl': 'testUrl'
                }
            ],
            'listItems': [
                {
                    '_id': '612e0a9e6269850c22d365e6',
                    'name': 'testIngredient',
                    'amount': 1,
                    'unit': 'testUnit',
                    'itemType': 'SNACKS',
                    'isDone': false
                }
            ],
            'listPictureUrl': 'www.testUrl.com',
            '__v': 5
        }
    }),
    __metadata("design:type", Object)
], UpdateListItemResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], UpdateListItemResponse.prototype, "statusCode", void 0);
exports.UpdateListItemResponse = UpdateListItemResponse;
class DeleteListItemResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, responseData: { required: true, type: () => Object }, statusCode: { required: true, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'OK'
    }),
    __metadata("design:type", String)
], DeleteListItemResponse.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: {
            'itemTypes': [
                'FRUITS',
                'VEGETABLE',
                'BAKEWAREPRODUCTS',
                'CANFOODPRODUCTS',
                'MEATPRODUCTS',
                'MILKPRODUCTS',
                'FROZENPRODUCTS',
                'ELECTRICALPRODUCTS',
                'HYGIENEPRODUCTS',
                'DRINKS',
                'SNACKS',
                'SWEETS'
            ],
            '_id': '612dfb35d270f6082b31c33d',
            'name': 'testList',
            'description': 'This is a test description',
            'weekRecipes': [
                {
                    '_id': '612cb926a6effb11a4dbb962',
                    'recipeName': 'testRecipe',
                    'garnish': 'testGarnish',
                    'ingredients': [
                        {
                            '_id': '612cb926a6effb11a4dbb963',
                            'name': 'testIngredient',
                            'amount': 1,
                            'unit': 'testUnit',
                            'itemType': 'SNACKS',
                            'isDone': true
                        }
                    ],
                    'recipePictureUrl': 'testUrl'
                }
            ],
            'listItems': [],
            'listPictureUrl': 'www.testUrl.com',
            '__v': 5
        }
    }),
    __metadata("design:type", Object)
], DeleteListItemResponse.prototype, "responseData", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 200
    }),
    __metadata("design:type", Number)
], DeleteListItemResponse.prototype, "statusCode", void 0);
exports.DeleteListItemResponse = DeleteListItemResponse;
//# sourceMappingURL=response.model.js.map