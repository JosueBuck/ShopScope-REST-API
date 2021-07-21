import { IUserDayRecipeDataDto } from './models/user.model';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    deleteUser(username: string): Promise<string>;
    getUsersLatestRecipes(userId: string): Promise<string[]>;
    addRecipeToDay(userId: string, userDayRecipe: IUserDayRecipeDataDto): Promise<void>;
    removeRecipeFromDay(userId: string, userDayRecipe: IUserDayRecipeDataDto): Promise<void>;
}
