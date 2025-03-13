import { Test, TestingModule } from '@nestjs/testing';
import { CompanyWorkerService } from './company-worker.service';

describe('CompanyWorkerService', () => {
  let service: CompanyWorkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyWorkerService],
    }).compile();

    service = module.get<CompanyWorkerService>(CompanyWorkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
