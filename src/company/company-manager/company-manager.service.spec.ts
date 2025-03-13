import { Test, TestingModule } from '@nestjs/testing';
import { CompanyManagerService } from './company-manager.service';

describe('CompanyManagerService', () => {
  let service: CompanyManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyManagerService],
    }).compile();

    service = module.get<CompanyManagerService>(CompanyManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
