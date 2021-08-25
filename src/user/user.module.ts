import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ListsModule } from 'src/lists/lists.module';
import { RecipesModule } from 'src/recipes/recipes.module';
import { WeeksModule } from 'src/weeks/weeks.module';
import { UserSchema } from './models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    RecipesModule,
    ListsModule,
    WeeksModule,
    AuthModule,
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
