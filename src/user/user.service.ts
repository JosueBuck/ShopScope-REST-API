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
                }
            }
            console.log(day);
        });
        userWeek.save();
    }

    async removeRecipeFromDay(userId: string, userDayRecipe: IUserDayRecipeData) {
        let userWeek: IUserWeekMongoose = await this.findUserWeekById(userId);
        let days = userWeek.week;
        days.map((day) => {
            if (day.id != userDayRecipe.dayId) {
                return;
            }
            console.log('test');
            switch(userDayRecipe.type) {
                case "breakfast": {
                    const index = day.breakfast.findIndex((recipe) => recipe.recipeId === userDayRecipe.recipe.recipeId);
                    console.log(index);
                    console.log(day);
                    day.breakfast.splice(index, 1);
                    console.log(day);
                }
            }
        });
        userWeek.save();
    }

    /* TO-DO: add clear the whole week functionallity */

    async addRecipeToUser(recipeId: string, userId: string) {
        const userRecipes: IUserRecipesMongoose = await this.findUserRecipesById(userId)
        userRecipes.recipes.push(recipeId);
        try {
            await userRecipes.save();
        } catch {
            throw new TimeoutError();
        } 
    }

    async getUsersLatestRecipes(userId: string) {
        const userRecipes = await this.findUserRecipesById(userId);
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

    async findUserRecipesById(userId: string): Promise<IUserRecipesMongoose> {
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

    async deleteUserRecipe(userId: string, recipeId: string) {
        this.userRecipesModel.findOneAndUpdate(
           {userId: userId },
           { $pull: {recipes: {_id: recipeId} }}
       ).exec();
    }

    async deleteUserList(userId: string, listId: string) {
        this.userListsModel.findOneAndUpdate(
            { userId: userId },
            { $pull: { lists: {_id: listId} }}
        ).exec();
    }
}
