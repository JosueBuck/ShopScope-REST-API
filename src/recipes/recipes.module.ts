import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { RecipeSchema } from './models/recipe.model';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Recipe', schema: RecipeSchema }]), 
        UserModule
    ],
    controllers: [RecipesController],
    providers: [RecipesService],
})
export class RecipesModule {}
