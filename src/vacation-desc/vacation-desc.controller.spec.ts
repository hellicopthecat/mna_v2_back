import { Test, TestingModule } from '@nestjs/testing';
import { VacationDescController } from './vacation-desc.controller';
import { VacationDescService } from './vacation-desc.service';

describe('VacationDescController', () => {
  let controller: VacationDescController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacationDescController],
      providers: [VacationDescService],
    }).compile();

    controller = module.get<VacationDescController>(VacationDescController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
