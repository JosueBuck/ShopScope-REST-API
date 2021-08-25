import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { ListsService } from 'src/lists/lists.service';
import { IResponse } from 'src/models/response.model';
import { RecipesService } from 'src/recipes/recipes.service';
import { WeeksService } from 'src/weeks/weeks.service';
import { ILoginData, IRegisterData, IUser, IUserMongoose } from './models/user.model';
export declare class UserService {
    private readonly userModel;
    private readonly recipeService;
    private readonly listsService;
    private readonly weeksService;
    private readonly authService;
    constructor(userModel: Model<IUser>, recipeService: RecipesService, listsService: ListsService, weeksService: WeeksService, authService: AuthService);
    createNewUser(userRegisterData: IRegisterData): Promise<IUser>;
    deleteUser(userId: string): Promise<IResponse>;
    findUserByName(username: string): Promise<IUserMongoose>;
    findUserById(userId: string): Promise<IUserMongoose>;
    loginUser(loginData: ILoginData): Promise<IResponse>;
    registerUser(registerData: IRegisterData): Promise<IResponse>;
}
