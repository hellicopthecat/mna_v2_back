import { Test, TestingModule } from '@nestjs/testing';
import { CompanyConnectService } from './company-connect.service';

describe('CompanyConnectService', () => {
  let service: CompanyConnectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyConnectService],
    }).compile();

    service = module.get<CompanyConnectService>(CompanyConnectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
