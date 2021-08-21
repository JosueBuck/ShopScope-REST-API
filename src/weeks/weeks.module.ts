import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserWeekSchema } from './models/week.model';
import { WeeksController } from './weeks.controller';
import { WeeksService } from './weeks.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'UserWeek', schema: UserWeekSchema}]),
  ],
  controllers: [WeeksController],
  providers: [WeeksService],
  exports: [WeeksService]
})
export class WeeksModule {}
