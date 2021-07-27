import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeoutError } from 'rxjs';
import { IRegisterData } from 'src/auth/models/registerData.model';
import { IUser, IUserMongoose, IUserRecipes, IUserRecipesMongoose, IUserLists, IUserListsMongoose, IUserDayRecipeData, IUserWeek, IUserWeekMongoose } from './models/user.model';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
        @InjectModel('UserRecipes') private readonly userRecipesModel: Model<IUserRecipes>,
        @InjectModel('UserLists') private readonly userListsModel: Model<IUserLists>,
        @InjectModel('UserWeek') private readonly userWeekModel: Model<IUserWeek>
    ) { }

    async createNewUser(userRegisterData: IRegisterData) {
        const newUser = new this.userModel(
            { 
                username: userRegisterData.username,
                password: userRegisterData.password,
                email: userRegisterData.email,
            });
        const userRecipes = new this.userRecipesModel(
            {
                userId: newUser.id,
            }
        );
        const userLists = new this.userListsModel(
            {
                userId: newUser.id,
            }
        );
        const userWeek = new this.userWeekModel(
            {
                userId: newUser.id,
                week: [
                    {
                        name: "monday",
                        breakfast: [],
                        lunch: [],
                        dinner: []
                    },
                    {
                        name: "tuesday",
                        breakfast: [],
                        lunch: [],
                        dinner: []
                    },
                    {
                        name: "wednesday",
                        breakfast: [],
                        lunch: [],
                        dinner: []
                    },
                    {
                        name: "thursday",
                        breakfast: [],
                        lunch: [],
                        dinner: []
                    },
                    {
                        name: "friday",
                        breakfast: [],
                        lunch: [],
                        dinner: []
                    },
                    {
                        name: "saturday",
                        breakfast: [],
                        lunch: [],
                        dinner: []
                    },
                    {
                        name: "sunday",
                        breakfast: [],
                        lunch: [],
                        dinner: []
                    }
                ]
            }
        )
            try {
                await newUser.save();
                await userRecipes.save();
                await userLists.save();
                await userWeek.save();
                return newUser;
            } catch {
                throw new TimeoutError();
            }
    }

    /* TO-DO: also delete userRecipes & userLists  */
    async deleteUser(userId: string) {
        await this.userModel.deleteOne({ _id: userId });
        return userId;
    }

    async getUserWeek(userId: string) {
        let userWeek: IUserWeekMongoose = await this.findUserWeekById(userId);
        return userWeek;
    }

    async addRecipeToDay(userId: string, userDayRecipe: IUserDayRecipeData) {
        let userWeek: IUserWeekMongoose = await this.findUserWeekById(userId);
        let days = userWeek.week;
        days.map((day) => {
            if (day.id != userDayRecipe.dayId) {
                return;
            }

            switch(userDayRecipe.type) {
                case "breakfast": {
                    day.breakfast.push(userDayRecipe.recipe);
                    break;
                }
                case "lunch": {
                    day.lunch.push(userDayRecipe.recipe);
                    break;
                }
                case "dinner": {
                    day.dinner.push(userDayRecipe.recipe);
                    break;
                }
            }
        });

        userWeek.save();
        return userWeek;
    }

    async removeRecipeFromDay(userId: string, userDayRecipe: IUserDayRecipeData) {
        let userWeek: IUserWeekMongoose = await this.findUserWeekById(userId);
        let days = userWeek.week;
        days.map((day) => {
            if (day.id != userDayRecipe.dayId) {
                return;
            }
            
            switch(userDayRecipe.type) {
                case "breakfast": {
                    const index = day.breakfast.findIndex((recipe) => recipe.id === userDayRecipe.recipe.id);
                    if (index > -1) {
                        day.breakfast.splice(index, 1);
                    }
                    break;
                }
                case "lunch": {
                    const index = day.lunch.findIndex((recipe) => recipe.id === userDayRecipe.recipe.id);
                    if (index > -1) {
                        day.lunch.splice(index, 1);
                    }
                    break;
                }
                case "dinner": {
                    const index = day.dinner.findIndex((recipe) => recipe.id === userDayRecipe.recipe.id);
                    if (index > -1) {
                        day.dinner.splice(index, 1);
                    }
                    break;
                }
            }
        });

        userWeek.save();
        return userWeek;
    }

    async removeAllRecipesFromWeek(userId: string) {
        let userWeek: IUserWeekMongoose = await this.findUserWeekById(userId);
        userWeek.week.map((day) => {
            day.breakfast = [];
            day.lunch = [];
            day.dinner = [];
        });
        userWeek.save();
        return userWeek;
    }

    /* TO-DO: add clear the whole week functionallity */

    async addRecipeIdToUser(recipeId: string, userId: string) {
        const userRecipes: IUserRecipesMongoose = await this.findUserRecipesIdsByUserId(userId)
        userRecipes.recipes.push(recipeId);
        try {
            await userRecipes.save();
        } catch {
            throw new TimeoutError();
        } 
    }
    
    async getUserRecipesIds(userId: string) {
        const userRecipes = await this.findUserRecipesIdsByUserId(userId);
        const userRecipeIds = userRecipes.recipes;
        return userRecipeIds;
    }

    async deleteUsersRecipeId(userId: string, recipeId: string) {
        this.userRecipesModel.findOneAndUpdate(
           {userId: userId },
           { $pull: {recipes: {_id: recipeId} }}
       ).exec();
    }

    async getUsersLatestRecipes(userId: string) {
        const userRecipes = await this.findUserRecipesIdsByUserId(userId);
        const recipes = userRecipes.recipes;
        const latestRecipes = recipes.slice(-4);
        return latestRecipes;
    }

    async addListToUser(listId: string, userId: string) {
        const userLists: IUserListsMongoose = await this.findUserListsById(userId);
        userLists.lists.push(listId);
        try {
            await userLists.save();
        } catch {
            throw new TimeoutError();
        } 
    }

    async getUserListsIds(userId: string) {
        const userLists = await this.findUserListsById(userId);
        const userListsIds = userLists.lists;
        return userListsIds;
    }

    async findUserByName(username: string): Promise<IUser> {
        let user: IUserMongoose;
        try {
            user = await this.userModel.findOne({ username: new RegExp('^' + username + '$', "i") });;
            return user;
        } catch {
            throw new TimeoutError();
        }
        
    }

    async findUserById(userId: string): Promise<IUserMongoose> {
        let user: IUserMongoose;
        try {
            user = await this.userModel.findOne({ _id: userId }).exec();
        } catch {
            throw new NotFoundException('Invalid user id');
        }

        if (!user) {
            throw new NotFoundException('Could not find user');
        }
        return user;
    }

    async findUserRecipesIdsByUserId(userId: string): Promise<IUserRecipesMongoose> {
        let userRecipes: IUserRecipesMongoose;
        try {
            userRecipes = await this.userRecipesModel.findOne({ userId: userId }).exec();
        } catch {
            throw new NotFoundException('Invalid user id');
        }

        if (!userRecipes) {
            throw new NotFoundException('Could not find user recipes');
        }
        return userRecipes;
    }

    async findUserListsById(userId: string): Promise<IUserListsMongoose> {
        let userLists: IUserListsMongoose;
        try {
            userLists = await this.userListsModel.findOne({ userId: userId }).exec();
        } catch {
            throw new NotFoundException('Invalid user id');
        }

        if (!userLists) {
            throw new NotFoundException('Could not find user recipes');
        }

        return userLists;
    }

    async findUserWeekById(userId: string): Promise<IUserWeekMongoose> {
        let userWeek: IUserWeekMongoose;
        try {
            userWeek = await this.userWeekModel.findOne({ userId: userId }).exec();
        } catch {
            throw new NotFoundException('Invalid user id');
        }

        if (!userWeek) {
            throw new NotFoundException('Could not find user week');
        }

        return userWeek;
    }

    

    async deleteUserList(userId: string, listId: string) {
        this.userListsModel.findOneAndUpdate(
            { userId: userId },
            { $pull: { lists: {_id: listId} }}
        ).exec();
    }
}
