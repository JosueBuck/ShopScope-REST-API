import { NewUserDayRecipeDataDto, UserDayRecipeDataDto } from './models/week.model';
import { WeeksService } from './weeks.service';
export declare class WeeksController {
    private readonly weeksService;
    constructor(weeksService: WeeksService);
    getUserWeek(userId: string): Promise<import("./models/week.model").IUserWeekMongoose>;
    addRecipeToDay(userId: string, userDayRecipe: NewUserDayRecipeDataDto): Promise<import("../models/response.model").IResponse>;
    removeRecipeFromDay(userId: string, userDayRecipe: UserDayRecipeDataDto): Promise<import("../models/response.model").IResponse>;
    removeAllRecipesFromWeek(userId: string): Promise<import("../models/response.model").IResponse>;
}
