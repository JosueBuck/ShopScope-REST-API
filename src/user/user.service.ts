import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRegisterData } from 'src/auth/models/registerData.model';
import { ListsService } from 'src/lists/lists.service';
import { RecipesService } from 'src/recipes/recipes.service';
import { IUser, IUserMongoose, IUserDayRecipeData, IUserWeek, IUserWeekMongoose, IMongooseIdArray, INewUserDayRecipeData } from './models/user.model';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
        @InjectModel('UserWeek') private readonly userWeekModel: Model<IUserWeek>,
        private readonly recipeService: RecipesService,
        private readonly listsService: ListsService
    ) { }

    async createNewUser(userRegisterData: IRegisterData) {
        const newUser = new this.userModel(
            { 
                username: userRegisterData.username,
                password: userRegisterData.password,
                email: userRegisterData.email,
            });
        this.recipeService.createNewUserRecipeModel(newUser.id);
        this.listsService.createNewUserListsModel(newUser.id);
        const userWeek = new this.userWeekModel(
            {
                userId: newUser.id,
                week: [
                    {
                        name: 'monday',
                        breakfast: [],
                        lunch: [],
                        dinner: []
                    },
                    {
                        name: 'tuesday',
                        breakfast: [],
                        lunch: [],
                        dinner: []
                    },
                    {
                        name: 'wednesday',
                        breakfast: [],
                        lunch: [],
                        dinner: []
                    },
                    {
                        name: 'thursday',
                        breakfast: [],
                        lunch: [],
                        dinner: []
                    },
                    {
                        name: 'friday',
                        breakfast: [],
                        lunch: [],
                        dinner: []
                    },
                    {
                        name: 'saturday',
                        breakfast: [],
                        lunch: [],
                        dinner: []
                    },
                    {
                        name: 'sunday',
                        breakfast: [],
                        lunch: [],
                        dinner: []
                    }
                ]
            }
        )
            try {
                await newUser.save();
                await userWeek.save();
                return newUser;
            } catch {
                throw new RequestTimeoutException();
            }
    }

    async deleteUser(userId: string) {

        await this.findUserById(userId);
        await this.findUserWeekById(userId);
        const simplifiedUserRecipesObject = await this.recipeService.getSimplifiedUserRecipesByUserId(userId);
        const simplifiedUserListsObject = await this.listsService.getSimplifiedUserListsByUserId(userId);
        const simplifiedLists = simplifiedUserListsObject.lists;
        const simplifiedRecipes = simplifiedUserRecipesObject.recipes;
    

        try {
            await this.listsService.deleteManyLists(simplifiedLists);
            await this.recipeService.deleteManyRecipes(simplifiedRecipes);
            await this.userModel.deleteOne({ _id: userId });
            await this.listsService.deleteUserListsModel(userId);
            await this.recipeService.deleteUserRecipeModel(userId);
            await this.userWeekModel.deleteOne({ userId: userId });
        } catch {
            throw new RequestTimeoutException();
        }
        
        return { message: 'Deleted', userId: userId, statusCode: 200 };
    }
    
    async getUserWeek(userId: string) {
        let userWeek: IUserWeekMongoose = await this.findUserWeekById(userId);
        return userWeek;
    }

    async addRecipeToDay(userId: string, userDayRecipe: INewUserDayRecipeData) {
        let userWeek: IUserWeekMongoose = await this.findUserWeekById(userId);
        let days = userWeek.week;
        let wasAdded: boolean = false;

        days.map((day) => {
            if (day._id != userDayRecipe.dayId) {
                return;
            }

            wasAdded = true;

            switch(userDayRecipe.type) {
                case 'breakfast': {
                    day.breakfast.push(userDayRecipe.recipe);
                    break;
                }
                case 'lunch': {
                    day.lunch.push(userDayRecipe.recipe);
                    break;
                }
                case 'dinner': {
                    day.dinner.push(userDayRecipe.recipe);
                    break;
                }
            }
        });

        if (wasAdded) {
            userWeek.save();
            return { message: 'Added', userDayRecipe: userDayRecipe, statusCode: 200 };
        } else {
            throw new NotFoundException('No day with this id was found!');
        } 
    }

    async removeRecipeFromDay(userId: string, userDayRecipe: IUserDayRecipeData) {

        let userWeek: IUserWeekMongoose = await this.findUserWeekById(userId);
        let days = userWeek.week;
        let wasRemoved: boolean = false;
        days.map((day) => {
            
            if (day._id != userDayRecipe.dayId) {
                return;
            }
            
            switch(userDayRecipe.type) {
                case 'breakfast': {
                    const index = day.breakfast.findIndex((recipe) => recipe._id == userDayRecipe.recipe._id);
                    if (index > -1) {
                        day.breakfast.splice(index, 1);
                        wasRemoved = true;
                    }
                    break;
                }
                case 'lunch': {
                    const index = day.lunch.findIndex((recipe) => recipe._id == userDayRecipe.recipe._id);
                    if (index > -1) {
                        day.lunch.splice(index, 1);
                        wasRemoved = true;
                    }
                    break;
                }
                case 'dinner': {
                    const index = day.dinner.findIndex((recipe) => recipe._id == userDayRecipe.recipe._id);
                    if (index > -1) {
                        day.dinner.splice(index, 1);
                        wasRemoved = true;
                    }
                    break;
                }
            }
        });

        if (wasRemoved) {
            userWeek.save();
            return { message: 'Removed', userDayRecipe: userDayRecipe, statusCode: 200 };
        } else {
            throw new NotFoundException('No day with this id was found!');
        }
    }

    async removeAllRecipesFromWeek(userId: string) {
        let userWeek: IUserWeekMongoose = await this.findUserWeekById(userId);
        userWeek.week.map((day) => {
            day.breakfast = [];
            day.lunch = [];
            day.dinner = [];
        });

        try {
            userWeek.save();
        } catch {
            throw new RequestTimeoutException();
        }
        
        return { message: 'Removed', userWeek: userWeek, statusCode: 200 };
    }

    async findUserByName(username: string): Promise<IUser> {
        let user: IUserMongoose;
        
        try {
            user = await this.userModel.findOne({ username: new RegExp('^' + username + '$', "i") });;
        } catch {
            throw new RequestTimeoutException();
        }
        return user;
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

    async findUserWeekById(userId: string): Promise<IUserWeekMongoose> {
        let userWeek: IUserWeekMongoose;
        await this.findUserById(userId);

        try {
            userWeek = await this.userWeekModel.findOne({ userId: userId }).exec();
        } catch {
            throw new RequestTimeoutException();
        }

        if (!userWeek) {
            throw new NotFoundException('Could not find user week');
        }
        return userWeek;
    }


}
