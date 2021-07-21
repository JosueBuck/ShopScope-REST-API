import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true},
    /* week: { type: 
        [ 
            { 
                name: String, 
                breakfast: { type: [ { _id: false, recipeName: String, recipeId: String } ] } ,
                lunch: { type: [ { recipeName: String, recipeId: String} ] },
                dinner: { type: [ { recipeName: String, recipeId: String} ] } 
            } 
        ] 
    }, */
    /* week: { 
            monday: { name: { type: String}, recipes: { type: [ { String } ] } }, 
            tuesday: { name: { type: String}, recipes: { type: [ { String } ] } }, 
            wednesday: { name: { type: String}, recipes: { type: [ { String } ] } }, 
            thursday: { name: { type: String}, recipes: { type: [ { String } ] } },
            friday: { name: { type: String}, recipes: { type: [ { String } ] } },
            saturday: { name: { type: String}, recipes: { type: [ { String } ] } },
            sunday: { name: { type: String}, recipes: { type: [ { String } ] } }, 
    }  */

    
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

/* export interface IWeek {
    monday: IDay, 
    tuesday: IDay, 
    wednesday: IDay, 
    thursday: IDay,
    friday: IDay, 
    saturday: IDay, 
    sunday: IDay 
} */








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

/* export interface IDayRecipe {
    recipeName: string;
    recipeId: string;
} */

export interface IUserDayRecipe {
    recipeName: string;
    recipeId: string;
}

export interface IUserDayRecipeDataDto {
    dayId: string;
    type: string;
    recipe: IUserDayRecipe
}

export interface IUserDayRecipeData {
    dayId: string;
    type: string;
    recipe: IUserDayRecipe
}

