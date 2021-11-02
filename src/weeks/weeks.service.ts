import { Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListsService } from 'src/lists/lists.service';
import { IResponse } from 'src/models/response.model';
import { INewUserDayRecipeData, IUserDay, IUserDayRecipeData, IUserWeek, IUserWeekMongoose } from './models/week.model';

@Injectable()
export class WeeksService {

    constructor(
        @InjectModel('UserWeek') private readonly userWeekModel: Model<IUserWeek>,
        private readonly listsService: ListsService,
    ) { }

    async getUserWeek(userId: string): Promise<IResponse> {

        let userWeek: IUserWeekMongoose = await this.findUserWeekById(userId);

        return { message: 'OK', responseData: userWeek, statusCode: 200 };

    }

    async setSelectedWeekList(userId: string, listId: string): Promise<IResponse> {

        await this.listsService.findListById(listId);

        let userWeek: IUserWeekMongoose = await this.findUserWeekById(userId);
        userWeek.selectedWeekList = listId;

        try {
            await userWeek.save();
        } catch {
            throw new InternalServerErrorException();
        }

        return { message: 'OK', responseData: userWeek, statusCode: 200 };

    }

    async addRecipeToDay(userId: string, userDayRecipe: INewUserDayRecipeData): Promise<IResponse> {

        let userWeek: IUserWeekMongoose = await this.findUserWeekById(userId);

        let days: IUserDay[] = userWeek.week;
        
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
            return { message: 'Added', responseData: userWeek, statusCode: 200 };
        } else {
            throw new NotFoundException('No day with this id was found');
        } 

    }

    async removeRecipeFromDay(userId: string, userDayRecipe: IUserDayRecipeData): Promise<IResponse> {

        let userWeek: IUserWeekMongoose = await this.findUserWeekById(userId);

        let days: IUserDay[] = userWeek.week;

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
                    console.log(userDayRecipe.recipe._id);
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
            return { message: 'Removed', responseData: userWeek, statusCode: 200 };
        } else {
            throw new NotFoundException('Could not delete recipe');
        }

    }

    async removeAllRecipesFromWeek(userId: string): Promise<IResponse> {

        let userWeek: IUserWeekMongoose = await this.findUserWeekById(userId);
        userWeek.week.map((day) => {
            day.breakfast = [];
            day.lunch = [];
            day.dinner = [];
        });

        try {
            userWeek.save();
        } catch {
            throw new InternalServerErrorException();
        }
        
        return { message: 'Removed', responseData: userWeek, statusCode: 200 };

    }

    async findUserWeekById(userId: string): Promise<IUserWeekMongoose> {
        
        let userWeek: IUserWeekMongoose;

        try {
            userWeek = await this.userWeekModel.findOne({ userId: userId }).exec();
        } catch {
            throw new InternalServerErrorException();
        }

        if (!userWeek) {
            throw new NotFoundException('Could not find user week');
        }
        
        return userWeek;

    }

    async createNewUserWeeksModel(userId: string): Promise<void> {

        const userWeek: IUserWeekMongoose = new this.userWeekModel(
            {
                userId: userId,
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
                ],
                selectedWeekList: ''
            }
        );

        console.log("error fixing test...");

        try {
            await userWeek.save();
        } catch {
            throw new InternalServerErrorException();
        }

    }

    async deleteUserWeeksModel(userId: string): Promise<void> {

        try {
            await this.userWeekModel.deleteOne({ userId: userId });
        } catch {
            throw new InternalServerErrorException();
        }
        
    }

}
