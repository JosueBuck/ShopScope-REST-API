import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from './models/list.model';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';


@Module({
    imports: [MongooseModule.forFeature([{name: 'List', schema: ListSchema}])],
    controllers: [ListsController],
    providers: [ListsService],
})
export class ListsModule {}
