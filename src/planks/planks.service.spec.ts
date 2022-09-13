import { Test, TestingModule } from '@nestjs/testing';
import { PlanksService } from './planks.service';

describe('PlanksService', () => {
  let service: PlanksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanksService],
    }).compile();

    service = module.get<PlanksService>(PlanksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
