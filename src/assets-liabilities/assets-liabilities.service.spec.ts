import { Test, TestingModule } from '@nestjs/testing';
import { AssetsLiabilitiesService } from './assets-liabilities.service';

describe('AssetsLiabilitiesService', () => {
  let service: AssetsLiabilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetsLiabilitiesService],
    }).compile();

    service = module.get<AssetsLiabilitiesService>(AssetsLiabilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
