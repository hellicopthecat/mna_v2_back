import { Test, TestingModule } from '@nestjs/testing';
import { IncomeExpendService } from './income-expend.service';

describe('IncomeExpendService', () => {
  let service: IncomeExpendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomeExpendService],
    }).compile();

    service = module.get<IncomeExpendService>(IncomeExpendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
