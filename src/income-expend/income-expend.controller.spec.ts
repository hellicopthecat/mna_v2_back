import { Test, TestingModule } from '@nestjs/testing';
import { IncomeExpendController } from './income-expend.controller';
import { IncomeExpendService } from './income-expend.service';

describe('IncomeExpendController', () => {
  let controller: IncomeExpendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomeExpendController],
      providers: [IncomeExpendService],
    }).compile();

    controller = module.get<IncomeExpendController>(IncomeExpendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
