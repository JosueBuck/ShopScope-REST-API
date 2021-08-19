import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema, UserListsSchema } from './models/list.model';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { UserModule } from 'src/user/user.module';


@Module({
    imports: [
        MongooseModule.forFeature([{name: 'List', schema: ListSchema}]),
        MongooseModule.forFeature([{name: 'UserLists', schema: UserListsSchema}]),
    ],
    controllers: [ListsController],
    providers: [ListsService],
    exports: [ListsService]
})
export class ListsModule {}
