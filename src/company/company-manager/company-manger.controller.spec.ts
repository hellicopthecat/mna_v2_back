import { Test, TestingModule } from '@nestjs/testing';
import { CompanyMangerController } from '../company-manger.controller';

describe('CompanyMangerController', () => {
  let controller: CompanyMangerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyMangerController],
    }).compile();

    controller = module.get<CompanyMangerController>(CompanyMangerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
