import { Model } from 'mongoose';
import { IResponse } from 'src/models/response.model';
import { INewUserDayRecipeData, IUserDayRecipeData, IUserWeek, IUserWeekMongoose } from './models/week.model';
export declare class WeeksService {
    private readonly userWeekModel;
    constructor(userWeekModel: Model<IUserWeek>);
    getUserWeek(userId: string): Promise<IResponse>;
    addRecipeToDay(userId: string, userDayRecipe: INewUserDayRecipeData): Promise<IResponse>;
    removeRecipeFromDay(userId: string, userDayRecipe: IUserDayRecipeData): Promise<IResponse>;
    removeAllRecipesFromWeek(userId: string): Promise<IResponse>;
    findUserWeekById(userId: string): Promise<IUserWeekMongoose>;
    createNewUserWeeksModel(userId: string): Promise<void>;
    deleteUserWeeksModel(userId: string): Promise<void>;
}
