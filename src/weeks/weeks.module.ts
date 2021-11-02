import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserWeekSchema } from './models/week.model';
import { WeeksController } from './weeks.controller';
import { WeeksService } from './weeks.service';
import { ListsModule } from 'src/lists/lists.module';

@Module({
  imports: [
    ListsModule, 
    MongooseModule.forFeature([{name: 'UserWeek', schema: UserWeekSchema}])
  ],
  controllers: [WeeksController],
  providers: [WeeksService],
  exports: [WeeksService]
})
export class WeeksModule {}
