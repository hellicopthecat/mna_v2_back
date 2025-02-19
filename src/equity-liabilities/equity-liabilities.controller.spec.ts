import { Test, TestingModule } from '@nestjs/testing';
import { EquityLiabilitiesController } from './equity-liabilities.controller';
import { EquityLiabilitiesService } from './equity-liabilities.service';

describe('EquityLiabilitiesController', () => {
  let controller: EquityLiabilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquityLiabilitiesController],
      providers: [EquityLiabilitiesService],
    }).compile();

    controller = module.get<EquityLiabilitiesController>(EquityLiabilitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
