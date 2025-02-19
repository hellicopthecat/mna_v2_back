import { Test, TestingModule } from '@nestjs/testing';
import { CompanyAssetsController } from './company-assets.controller';
import { CompanyAssetsService } from './company-assets.service';

describe('CompanyAssetsController', () => {
  let controller: CompanyAssetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyAssetsController],
      providers: [CompanyAssetsService],
    }).compile();

    controller = module.get<CompanyAssetsController>(CompanyAssetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
