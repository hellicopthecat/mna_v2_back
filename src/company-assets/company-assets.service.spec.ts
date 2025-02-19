import { Test, TestingModule } from '@nestjs/testing';
import { CompanyAssetsService } from './company-assets.service';

describe('CompanyAssetsService', () => {
  let service: CompanyAssetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyAssetsService],
    }).compile();

    service = module.get<CompanyAssetsService>(CompanyAssetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
