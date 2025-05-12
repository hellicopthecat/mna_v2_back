import { Test, TestingModule } from '@nestjs/testing';
import { CompanyWorkersVacationService } from './company-workers-vacation.service';

describe('CompanyWorkersVacationService', () => {
  let service: CompanyWorkersVacationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyWorkersVacationService],
    }).compile();

    service = module.get<CompanyWorkersVacationService>(CompanyWorkersVacationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
