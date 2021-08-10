import { UserDayRecipeDataDto } from './models/user.model';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    deleteUser(userId: string): Promise<{
        message: string;
        userId: string;
        statusCode: number;
    }>;
    getUserRecipesIds(userId: string): Promise<string[]>;
    getUsersLatestRecipesIds(userId: string): Promise<string[]>;
    getUserListsIds(userId: string): Promise<string[]>;
    getUserWeek(userId: string): Promise<import("./models/user.model").IUserWeekMongoose>;
    addRecipeToDay(userId: string, userDayRecipe: UserDayRecipeDataDto): Promise<{
        message: string;
        userDayRecipe: import("./models/user.model").IUserDayRecipeData;
        statusCode: number;
    }>;
    removeRecipeFromDay(userId: string, userDayRecipe: UserDayRecipeDataDto): Promise<{
        message: string;
        userDayRecipe: import("./models/user.model").IUserDayRecipeData;
        statusCode: number;
    }>;
    removeAllRecipesFromWeek(userId: string): Promise<{
        message: string;
        userWeek: import("./models/user.model").IUserWeekMongoose;
        statusCode: number;
    }>;
}
