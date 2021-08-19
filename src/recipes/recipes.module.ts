import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeSchema, UserRecipesSchema } from './models/recipe.model';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Recipe', schema: RecipeSchema }]), 
        MongooseModule.forFeature([{name: 'UserRecipes', schema: UserRecipesSchema}]),
    ],
    controllers: [RecipesController],
    providers: [RecipesService],
    exports: [RecipesService]
})
export class RecipesModule {}
