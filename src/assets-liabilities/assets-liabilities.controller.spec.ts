import { Test, TestingModule } from '@nestjs/testing';
import { AssetsLiabilitiesController } from './assets-liabilities.controller';
import { AssetsLiabilitiesService } from './assets-liabilities.service';

describe('AssetsLiabilitiesController', () => {
  let controller: AssetsLiabilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetsLiabilitiesController],
      providers: [AssetsLiabilitiesService],
    }).compile();

    controller = module.get<AssetsLiabilitiesController>(AssetsLiabilitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
