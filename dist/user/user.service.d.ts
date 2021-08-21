import { Model } from 'mongoose';
import { IRegisterData } from 'src/auth/models/registerData.model';
import { ListsService } from 'src/lists/lists.service';
import { RecipesService } from 'src/recipes/recipes.service';
import { WeeksService } from 'src/weeks/weeks.service';
import { IUser, IUserMongoose } from './models/user.model';
export declare class UserService {
    private readonly userModel;
    private readonly recipeService;
    private readonly listsService;
    private readonly weeksService;
    constructor(userModel: Model<IUser>, recipeService: RecipesService, listsService: ListsService, weeksService: WeeksService);
    createNewUser(userRegisterData: IRegisterData): Promise<IUser>;
    deleteUser(userId: string): Promise<{
        message: string;
        userId: string;
        statusCode: number;
    }>;
    findUserByName(username: string): Promise<IUser>;
    findUserById(userId: string): Promise<IUserMongoose>;
}
