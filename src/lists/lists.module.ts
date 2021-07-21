import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from './models/list.model';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { UserModule } from 'src/user/user.module';


@Module({
    imports: [
        MongooseModule.forFeature([{name: 'List', schema: ListSchema}]),
        UserModule
    ],
    controllers: [ListsController],
    providers: [ListsService],
})
export class ListsModule {}
