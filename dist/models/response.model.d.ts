import { IList, ISimplifiedList } from 'src/lists/models/list.model';
import { IRecipe, ISimplifiedRecipe } from 'src/recipes/models/recipe.model';
import { ISuccessfullLoginData, IUser } from 'src/user/models/user.model';
import { IUserWeek } from 'src/weeks/models/week.model';
export interface IResponse {
    message: string;
    responseData: any;
    statusCode: number;
}
export declare class LoginResponse {
    message: string;
    responseData: ISuccessfullLoginData;
    statusCode: number;
}
export declare class RegisterResponse {
    message: string;
    responseData: {
        newUser: IUser;
        jwt: string;
    };
    statusCode: number;
}
export declare class DeleteUserResponse {
    message: string;
    responseData: string;
    statusCode: number;
}
export declare class UpdateUserInformationsResponse {
    message: string;
    responseData: IUser;
    statusCode: number;
}
export declare class GetUserWeekResponse {
    message: string;
    responseData: IUserWeek;
    statusCode: number;
}
export declare class AddRecipeToDayResponse {
    message: string;
    responseData: IUserWeek;
    statusCode: number;
}
export declare class RemoveRecipeFromDayResponse {
    message: string;
    responseData: IUserWeek;
    statusCode: number;
}
export declare class RemoveAllRecipesFromWeekResponse {
    message: string;
    responseData: IUserWeek;
    statusCode: number;
}
export declare class CreateRecipeResponse {
    message: string;
    responseData: IRecipe;
    statusCode: number;
}
export declare class UpdateRecipeResponse {
    message: string;
    responseData: IRecipe;
    statusCode: number;
}
export declare class GetSimplifiedUserRecipesResponse {
    message: string;
    responseData: ISimplifiedRecipe[];
    statusCode: number;
}
export declare class getSimplifiedUserRecipesOfRecipeTypeResponse {
    message: string;
    responseData: IRecipe;
    statusCode: number;
}
export declare class GetRecipeResponse {
    message: string;
    responseData: IRecipe;
    statusCode: number;
}
export declare class DeleteRecipeResponse {
    message: string;
    responseData: IRecipe;
    statusCode: number;
}
export declare class CreateListResponse {
    message: string;
    responseData: IList;
    statusCode: number;
}
export declare class GetSimplifiedUserListsResponse {
    message: string;
    responseData: ISimplifiedList[];
    statusCode: number;
}
export declare class GetListResponse {
    message: string;
    responseData: IList;
    statusCode: number;
}
export declare class DeleteListResponse {
    message: string;
    responseData: String;
    statusCode: number;
}
export declare class AddWeekRecipesToList {
    message: string;
    responseData: IList;
    statusCode: number;
}
export declare class RemoveWeekRecipeFromListResponse {
    message: string;
    responseData: IList;
    statusCode: number;
}
export declare class UpdateWeekRecipeIngredientInList {
    message: string;
    responseData: IList;
    statusCode: number;
}
export declare class AddListItemResponse {
    message: string;
    responseData: IList;
    statusCode: number;
}
export declare class UpdateListItemResponse {
    message: string;
    responseData: IList;
    statusCode: number;
}
export declare class DeleteListItemResponse {
    message: string;
    responseData: IList;
    statusCode: number;
}
