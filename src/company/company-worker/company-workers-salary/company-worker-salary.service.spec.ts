import { Test, TestingModule } from '@nestjs/testing';
import { CompanyWorkerSalaryService } from './company-workers-salary.service';

describe('CompanyWorkerSalaryService', () => {
  let service: CompanyWorkerSalaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyWorkerSalaryService],
    }).compile();

    service = module.get<CompanyWorkerSalaryService>(
      CompanyWorkerSalaryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
