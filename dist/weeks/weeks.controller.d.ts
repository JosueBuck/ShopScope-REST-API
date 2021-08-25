import { IResponse } from 'src/models/response.model';
import { NewUserDayRecipeDataDto, UserDayRecipeDataDto } from './models/week.model';
import { WeeksService } from './weeks.service';
export declare class WeeksController {
    private readonly weeksService;
    constructor(weeksService: WeeksService);
    getUserWeek(userId: string): Promise<IResponse>;
    addRecipeToDay(userId: string, userDayRecipe: NewUserDayRecipeDataDto): Promise<IResponse>;
    removeRecipeFromDay(userId: string, userDayRecipe: UserDayRecipeDataDto): Promise<IResponse>;
    removeAllRecipesFromWeek(userId: string): Promise<IResponse>;
}
