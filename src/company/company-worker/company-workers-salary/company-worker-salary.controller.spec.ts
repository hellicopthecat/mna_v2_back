import { Test, TestingModule } from '@nestjs/testing';
import { CompanyWorkerSalaryController } from './company-workers-salary.controller';

describe('CompanyWorkerSalaryController', () => {
  let controller: CompanyWorkerSalaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyWorkerSalaryController],
    }).compile();

    controller = module.get<CompanyWorkerSalaryController>(
      CompanyWorkerSalaryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
