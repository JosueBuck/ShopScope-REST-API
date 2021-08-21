import { Test, TestingModule } from '@nestjs/testing';
import { WeeksController } from './weeks.controller';

describe('WeeksController', () => {
  let controller: WeeksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeeksController],
    }).compile();

    controller = module.get<WeeksController>(WeeksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
