import { Test, TestingModule } from '@nestjs/testing';
import { EquityLiabilitiesService } from './equity-liabilities.service';

describe('EquityLiabilitiesService', () => {
  let service: EquityLiabilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquityLiabilitiesService],
    }).compile();

    service = module.get<EquityLiabilitiesService>(EquityLiabilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
