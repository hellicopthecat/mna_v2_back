import { Test, TestingModule } from '@nestjs/testing';
import { CompanyConnectController } from './company-connect.controller';

describe('CompanyConnectController', () => {
  let controller: CompanyConnectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyConnectController],
    }).compile();

    controller = module.get<CompanyConnectController>(CompanyConnectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
