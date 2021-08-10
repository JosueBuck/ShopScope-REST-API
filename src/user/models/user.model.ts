import * as mongoose from 'mongoose';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true},
})

export interface IUser {
    id: string;
    username: string;
    password: string;
    email: string;
}

export interface IUserMongoose extends mongoose.Document {
    id: string;
    username: string;
    password: string;
    email: string;
}




/* User Recipes */

export const UserRecipesSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    recipes: { type: [ { String } ] },
})

export interface IUserRecipesMongoose extends mongoose.Document {
    id: string;
    userId: string;
    recipes: string[],
}

export interface IUserRecipes {
    id: string;
    userId: string;
    recipes: string[],
}


/* User Lists */

export const UserListsSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    lists: { type: [ { String } ] },
})

export interface IUserListsMongoose extends mongoose.Document {
    id: string;
    userId: string;
    lists: string[]
}

export interface IUserLists {
    id: string;
    userId: string;
    lists: string[]
}


/* User Week */

export const UserWeekSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    week: { type: 
        [ 
            { 
                name: String, 
                breakfast: { type: [ { recipeName: String, recipeId: String } ] } ,
                lunch: { type: [ { recipeName: String, recipeId: String} ] },
                dinner: { type: [ { recipeName: String, recipeId: String} ] } 
            } 
        ] 
    },
});

export interface IUserWeekMongoose extends mongoose.Document {
    id: string;
    userId: string;
    week: IUserDay[];
}

export interface IUserWeek {
    id: string;
    userId: string;
    week: IUserDay[];
}

export interface IUserDay {
    id: string;
    name: string;
    breakfast: IUserDayRecipe[];
    lunch: IUserDayRecipe[];
    dinner: IUserDayRecipe[];
}

export interface IUserDayRecipe {
    id?: string;
    recipeName: string;
}

export class UserDayRecipeDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    recipeName: string;
}

export class UserDayRecipeDataDto {

    @IsString()
    @IsNotEmpty()
    dayId: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UserDayRecipeDto)
    recipe: UserDayRecipeDto
}



export interface IUserDayRecipeData {
    dayId: string;
    type: string;
    recipe: IUserDayRecipe
}

