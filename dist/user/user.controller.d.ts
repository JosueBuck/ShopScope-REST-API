import { NewUserDayRecipeDataDto, UserDayRecipeDataDto } from './models/user.model';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    deleteUser(userId: string): Promise<{
        message: string;
        userId: string;
        statusCode: number;
    }>;
    getUserWeek(userId: string): Promise<import("./models/user.model").IUserWeekMongoose>;
    addRecipeToDay(userId: string, userDayRecipe: NewUserDayRecipeDataDto): Promise<{
        message: string;
        userDayRecipe: import("./models/user.model").INewUserDayRecipeData;
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
