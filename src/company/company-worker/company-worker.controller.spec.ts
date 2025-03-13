import { Test, TestingModule } from '@nestjs/testing';
import { CompanyWorkerController } from './company-worker.controller';

describe('CompanyWorkerController', () => {
  let controller: CompanyWorkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyWorkerController],
    }).compile();

    controller = module.get<CompanyWorkerController>(CompanyWorkerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
