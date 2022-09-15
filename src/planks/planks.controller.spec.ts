import { Test, TestingModule } from '@nestjs/testing';
import { PlanksController } from './planks.controller';

describe('PlanksController', () => {
  let controller: PlanksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanksController],
    }).compile();

    controller = module.get<PlanksController>(PlanksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
