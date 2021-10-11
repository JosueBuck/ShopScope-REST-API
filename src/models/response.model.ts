import { ApiProperty } from '@nestjs/swagger';
import { IList, ISimplifiedList } from 'src/lists/models/list.model';
import { IRecipe, ISimplifiedRecipe } from 'src/recipes/models/recipe.model';
import { ISuccessfullLoginData, IUser } from 'src/user/models/user.model';
import { IUserWeek } from 'src/weeks/models/week.model';

export interface IResponse {

    message: string;
    responseData: any;
    statusCode: number;
    
}

/* User Responses */
export class LoginResponse {
    
    @ApiProperty({
        example: 'Created'
    })
    message: string;

    @ApiProperty({
        example: { 
            'user': 
                { '_id': '612caa8c026d490b4b4c8cfc', 'firstname': 'Hans', 'lastname':'Müller', 'username': 'Username', 'password': 'xxxx', 'email': 'user@mail.com', '__v': 0 
            },
            'jwt': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUGF5bG9hZERhdGEiOnsiX2lkIjoiNjEzMGQ2MjFhMzgzNTkwYzA1MWM3YTM4IiwiZmlyc3RuYW1lIjoiSGFucyIsImxhc3RuYW1lIjoiTcO8bGxlciIsInVzZXJuYW1lIjoidGVzdHVzZXIxIiwiZW1haWwiOiJ0ZXN0bWFpbEBtYWlsLmNvbSJ9LCJpYXQiOjE2MzA1OTA1MTAsImV4cCI6MTYzMDY5MDUxMH0._p24_f79s8EE_XP0jg1Px0dtiiDF5NW-TTcVGn4jHH4'
        }
    })
    responseData: ISuccessfullLoginData;

    @ApiProperty({
        example: 201
    })
    statusCode: number;

}

export class RegisterResponse {
    
    @ApiProperty({
        example: 'Created'
    })
    message: string;

    @ApiProperty({
        example: { '_id': '612caa8c026d490b4b4c8cfc', 'firstname': 'Hans', 'lastname':'Müller', 'username': 'Username', 'password': 'xxxx', 'email': 'user@mail.com', '__v': 0 }
    })
    responseData: IUser;

    @ApiProperty({
        example: 201
    })
    statusCode: number;

}

export class DeleteUserResponse {
    
    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
        example: '612caa8c026d490b4b4c8cfc'
    })
    responseData: string;

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}

export class UpdateUserInformationsResponse {

    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
        example: { '_id': '612caa8c026d490b4b4c8cfc', 'firstname': 'Hans', 'lastname':'Müller', 'username': 'Username', 'password': 'xxxx', 'email': 'user@mail.com', '__v': 0 }
    })
    responseData: IUser;

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}

/* User Week Responses */
export class GetUserWeekResponse {
    
    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
        example:  {
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
    })
    responseData: IUserWeek;

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}


export class AddRecipeToDayResponse {

    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
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
                                'ingredients': [
                                    {
                                        '_id': '612cb926a6effb11a4dbb963',
                                        'name': 'testIngredient',
                                        'amount': 1,
                                        'unit': 'testUnit',
                                        'itemType': 'SNACKS',
                                        'isDone': false
                                    }
                                ]
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
    })
    responseData: IUserWeek;

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}

export class RemoveRecipeFromDayResponse {

    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
        example:  {
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
    })
    responseData: IUserWeek;

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}

export class RemoveAllRecipesFromWeekResponse {

    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
        example:  {
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
    })
    responseData: IUserWeek;

    @ApiProperty({
        example: 200
    })
    statusCode: number;
}

/* User Recipe Responses */

export class CreateRecipeResponse {

    @ApiProperty({
        example: 'Created'
    })
    message: string;

    @ApiProperty({
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
            '__v': 0
        }
    })
    responseData: IRecipe;

    @ApiProperty({
        example: 201
    })
    statusCode: number;

}

export class UpdateRecipeResponse {

    @ApiProperty({
        example: 'OK'
    })
    message: string;  
    
    @ApiProperty({
        example: {
            'recipeType': [
                'FASTFOOD'
            ],
            'instructions': [
                'Updated instruction 1',
                'Updated instruction 2'
            ],
            '_id': '612d0b3cd963d505785851dd',
            'name': 'updatedTestIngredient',
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
            '__v': 1
        }
    })
    responseData: IRecipe;

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}

export class GetSimplifiedUserRecipesResponse {

    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
        example: [
            {
                'recipeType': [
                    'FASTFOOD'
                ],
                '_id': '612d0b3cd963d505785851dd',
                'recipeName': 'updatedTestRecipe'
            },
            {
                'recipeType': [
                    'FASTFOOD'
                ],
                '_id': '612d11228dafa20782cce9fa',
                'recipeName': 'testRecipe'
            }
        ]
    })
    responseData: ISimplifiedRecipe[]

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}

export class getSimplifiedUserRecipesOfRecipeTypeResponse {

    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
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
                '__v': 0
            }
        ]
    })
    responseData: IRecipe;

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}

export class GetRecipeResponse {

    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
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
                '__v': 0
            }
        ]
    })
    responseData: IRecipe;

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}

export class DeleteRecipeResponse {

    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
        description: 'Id of the deleted recipe',
        type: String,
        example: '612d1cd0677c0c08912bae54'
    })
    responseData: IRecipe;

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}

/* User Lists */

export class CreateListResponse {

    @ApiProperty({
        example: 'Created'
    })
    message: string;

    @ApiProperty({
        example:  {
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
                    'ingredients': [
                        {
                            '_id': '612cb926a6effb11a4dbb963',
                            'name': 'testIngredient',
                            'amount': 1,
                            'unit': 'testUnit',
                            'itemType': 'SNACKS',
                            'isDone': false
                        }
                    ]
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
            '__v': 0
        }
    })
    responseData: IList;

    @ApiProperty({
        example: 201
    })
    statusCode: number;
    
}

export class GetSimplifiedUserListsResponse {

    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
        example: [
            {
                '_id': '612df114d5f15405daeb8b86',
                'listName': 'testList'
            }
        ]
    })
    responseData: ISimplifiedList[];

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}

export class GetListResponse {

    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
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
                    'ingredients': [
                        {
                            '_id': '612cb926a6effb11a4dbb963',
                            'name': 'testIngredient',
                            'amount': 1,
                            'unit': 'testUnit',
                            'itemType': 'SNACKS',
                            'isDone': false
                        }
                    ]
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
            '__v': 0
        }
    })
    responseData: IList;

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}

export class DeleteListResponse {

    @ApiProperty({
        example: 'Created'
    })
    message: string;

    @ApiProperty({
        type: String,
        example:  '612df114d5f15405daeb8b86'
    })
    responseData: String;

    @ApiProperty({
        example: 200
    })
    statusCode: number;
    
}

export class AddWeekRecipesToList {

    @ApiProperty({
        example: 'Created'
    })
    message: string;

    @ApiProperty({
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
                    'ingredients': [
                        {
                            '_id': '612cb926a6effb11a4dbb963',
                            'name': 'testIngredient',
                            'amount': 1,
                            'unit': 'testUnit',
                            'itemType': 'SNACKS',
                            'isDone': false
                        }
                    ]
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
            '__v': 1
        }
    })
    responseData: IList;

    @ApiProperty({
        example: 200
    })
    statusCode: number;
    
}

export class RemoveWeekRecipeFromListResponse {

    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
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
            '__v': 2
        }
    })
    responseData: IList;

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}

export class UpdateWeekRecipeIngredientInList {

    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
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
                    'ingredients': [
                        {
                            '_id': '612cb926a6effb11a4dbb963',
                            'name': 'testIngredient',
                            'amount': 1,
                            'unit': 'testUnit',
                            'itemType': 'SNACKS',
                            'isDone': true
                        }
                    ]
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
            '__v': 3
        }
    })
    responseData: IList;

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}

export class AddListItemResponse {

    @ApiProperty({
        example: 'Created'
    })
    message: string;

    @ApiProperty({
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
                    'ingredients': [
                        {
                            '_id': '612cb926a6effb11a4dbb963',
                            'name': 'testIngredient',
                            'amount': 1,
                            'unit': 'testUnit',
                            'itemType': 'SNACKS',
                            'isDone': true
                        }
                    ]
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
            '__v': 4
        }
    })
    responseData: IList;

    @ApiProperty({
        example: 201
    })
    statusCode: number;

}

export class UpdateListItemResponse {

    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
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
                    'ingredients': [
                        {
                            '_id': '612cb926a6effb11a4dbb963',
                            'name': 'testIngredient',
                            'amount': 1,
                            'unit': 'testUnit',
                            'itemType': 'SNACKS',
                            'isDone': true
                        }
                    ]
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
            '__v': 5
        }
    })
    responseData: IList;

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}

export class DeleteListItemResponse {

    @ApiProperty({
        example: 'OK'
    })
    message: string;

    @ApiProperty({
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
                    'ingredients': [
                        {
                            '_id': '612cb926a6effb11a4dbb963',
                            'name': 'testIngredient',
                            'amount': 1,
                            'unit': 'testUnit',
                            'itemType': 'SNACKS',
                            'isDone': true
                        }
                    ]
                }
            ],
            'listItems': [],
            '__v': 5
        }
    })
    responseData: IList;

    @ApiProperty({
        example: 200
    })
    statusCode: number;

}