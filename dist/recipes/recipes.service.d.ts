import { Model } from 'mongoose';
import { IResponse } from 'src/models/response.model';
import { IRecipe, INewRecipe, IRecipeMongoose, RecipeType, IUserRecipes, IUserRecipesMongoose, ISimplifiedRecipe } from './models/recipe.model';
export declare class RecipesService {
    private readonly recipeModel;
    private readonly userRecipesModel;
    constructor(recipeModel: Model<IRecipe>, userRecipesModel: Model<IUserRecipes>);
    createRecipe(recipe: INewRecipe, userId: string): Promise<IResponse>;
    addRecipeToUserRecipes(recipe: IRecipeMongoose, userId: string): Promise<ISimplifiedRecipe[]>;
    getSimplifiedUserRecipesRequest(userId: string): Promise<IResponse>;
    getSimplifiedUserRecipesInfo(userId: string): Promise<ISimplifiedRecipe[]>;
    getLatestSimplifiedUserRecipes(userId: string): Promise<IResponse>;
    getSimplifiedUserRecipesByUserId(userId: string): Promise<IUserRecipesMongoose>;
    updateRecipe(userId: string, updatedRecipe: IRecipe): Promise<IResponse>;
    getRecipe(recipeId: string): Promise<IResponse>;
    findRecipeById(id: string): Promise<IRecipeMongoose>;
    getAllRecipes(): Promise<IRecipeMongoose[]>;
    getSimplifiedUserRecipesOfRecipeType(recipeType: RecipeType[], userId: string): Promise<IResponse>;
    deleteRecipe(userId: string, recipeId: string): Promise<IResponse>;
    deleteManyRecipes(recipes: ISimplifiedRecipe[]): Promise<void>;
    getIdsFromUserRecipes(recipes: ISimplifiedRecipe[]): string[];
    createNewUserRecipeModel(userId: string): Promise<void>;
    deleteUserRecipeModel(userId: string): Promise<void>;
}
