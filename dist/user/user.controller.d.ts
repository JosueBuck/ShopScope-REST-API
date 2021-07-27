import { IUserDayRecipeDataDto } from './models/user.model';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    deleteUser(username: string): Promise<string>;
    getUserRecipesIds(userId: string): Promise<string[]>;
    getUsersLatestRecipesIds(userId: string): Promise<string[]>;
    getUserLists(userId: string): Promise<string[]>;
    getUserWeek(userId: string): Promise<import("./models/user.model").IUserWeekMongoose>;
    addRecipeToDay(userId: string, userDayRecipe: IUserDayRecipeDataDto): Promise<import("./models/user.model").IUserWeekMongoose>;
    removeRecipeFromDay(userId: string, userDayRecipe: IUserDayRecipeDataDto): Promise<import("./models/user.model").IUserWeekMongoose>;
    removeAllRecipesFromWeek(userId: string): Promise<import("./models/user.model").IUserWeekMongoose>;
}
