import { Model } from 'mongoose';
import { IResponse } from 'src/models/response.model';
import { IRecipe, INewRecipe, IRecipeMongoose, RecipeType, IUserRecipes, IUserRecipesMongoose, ISimplifiedRecipe } from './models/recipe.model';
export declare class RecipesService {
    private readonly recipeModel;
    private readonly userRecipesModel;
    constructor(recipeModel: Model<IRecipe>, userRecipesModel: Model<IUserRecipes>);
    createRecipe(recipe: INewRecipe, userId: string): Promise<IResponse>;
    addRecipeToUserRecipes(recipe: IRecipeMongoose, userId: string): Promise<ISimplifiedRecipe[]>;
    getSimplifiedUserRecipesInfo(userId: string): Promise<ISimplifiedRecipe[]>;
    getUsersLatestRecipesIds(userId: string): Promise<ISimplifiedRecipe[]>;
    getSimplifiedUserRecipesByUserId(userId: string): Promise<IUserRecipesMongoose>;
    updateRecipe(userId: string, updatedRecipe: IRecipe): Promise<IResponse>;
    getSingleRecipe(recipeId: string): Promise<IRecipeMongoose>;
    findRecipeById(id: string): Promise<IRecipeMongoose>;
    getAllRecipes(): Promise<IRecipeMongoose[]>;
    getUserRecipesOfRecipeType(recipeType: RecipeType[], userId: string): Promise<IRecipeMongoose[]>;
    deleteRecipe(userId: string, recipeId: string): Promise<IResponse>;
    deleteManyRecipes(recipes: ISimplifiedRecipe[]): Promise<void>;
    getIdsFromUserRecipes(recipes: ISimplifiedRecipe[]): string[];
    createNewUserRecipeModel(userId: string): Promise<void>;
    deleteUserRecipeModel(userId: string): Promise<void>;
}
