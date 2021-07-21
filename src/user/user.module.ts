import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserRecipesSchema, UserListsSchema, UserWeekSchema } from './models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'UserRecipes', schema: UserRecipesSchema}]),
    MongooseModule.forFeature([{name: 'UserLists', schema: UserListsSchema}]),
    MongooseModule.forFeature([{name: 'UserWeek', schema: UserWeekSchema}]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
