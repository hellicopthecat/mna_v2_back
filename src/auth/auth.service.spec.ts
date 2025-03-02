import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Partial<Record<keyof Repository<User>, jest.Mock>>;
  beforeEach(async () => {
    userRepository = {
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Create User', async () => {
    userRepository.findOneBy!.mockResolvedValue(null);
    userRepository.create!.mockReturnValue({ id: 1 });
    userRepository.save!.mockReturnValue({ id: 1 });
    const createUser = await service.create({
      email: 'test@test.ts',
      userName: 'Test_User_Name',
      firstName: 'Test_FirstName',
      lastName: 'Test_LastName',
      password: '1234',
      checkPass: '1234',
      phone: '123-124',
    });
    expect(createUser).toBe(1);
  });
});
