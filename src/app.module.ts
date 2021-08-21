import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RecipesModule } from './recipes/recipes.module';
import { ListsModule } from './lists/lists.module';
import { WeeksModule } from './weeks/weeks.module';


@Module({
  imports: [AuthModule, MongooseModule.forRoot('mongodb+srv://testuser:1234@cluster0.ujifz.mongodb.net/shop-scope?retryWrites=true&w=majority'), UserModule, RecipesModule, ListsModule, WeeksModule],
  controllers: [AppController],
  providers: [ AppService],
})
export class AppModule {}
