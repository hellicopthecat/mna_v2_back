import { Test, TestingModule } from '@nestjs/testing';
import { CompanyWorkersVacationController } from './company-workers-vacation.controller';

describe('CompanyWorkersVacationController', () => {
  let controller: CompanyWorkersVacationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyWorkersVacationController],
    }).compile();

    controller = module.get<CompanyWorkersVacationController>(CompanyWorkersVacationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
