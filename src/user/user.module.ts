import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListsModule } from 'src/lists/lists.module';
import { RecipesModule } from 'src/recipes/recipes.module';
import { UserSchema, UserWeekSchema } from './models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    RecipesModule,
    ListsModule,
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'UserWeek', schema: UserWeekSchema}]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
