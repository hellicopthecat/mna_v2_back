import { Test, TestingModule } from '@nestjs/testing';
import { VacationDescService } from './vacation-desc.service';

describe('VacationDescService', () => {
  let service: VacationDescService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacationDescService],
    }).compile();

    service = module.get<VacationDescService>(VacationDescService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
