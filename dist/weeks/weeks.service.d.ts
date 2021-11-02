import { Model } from 'mongoose';
import { ListsService } from 'src/lists/lists.service';
import { IResponse } from 'src/models/response.model';
import { INewUserDayRecipeData, IUserDayRecipeData, IUserWeek, IUserWeekMongoose } from './models/week.model';
export declare class WeeksService {
    private readonly userWeekModel;
    private readonly listsService;
    constructor(userWeekModel: Model<IUserWeek>, listsService: ListsService);
    getUserWeek(userId: string): Promise<IResponse>;
    setSelectedWeekList(userId: string, listId: string): Promise<IResponse>;
    addRecipeToDay(userId: string, userDayRecipe: INewUserDayRecipeData): Promise<IResponse>;
    removeRecipeFromDay(userId: string, userDayRecipe: IUserDayRecipeData): Promise<IResponse>;
    removeAllRecipesFromWeek(userId: string): Promise<IResponse>;
    findUserWeekById(userId: string): Promise<IUserWeekMongoose>;
    createNewUserWeeksModel(userId: string): Promise<void>;
    deleteUserWeeksModel(userId: string): Promise<void>;
}
