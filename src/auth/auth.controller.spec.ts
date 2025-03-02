import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LogInDto } from './dto/log-in.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: {
    create: jest.Mock;
    logIn: jest.Mock;
    getMyProfile: jest.Mock;
  };
  const mockCreateUserDto: CreateUserDto = {
    email: 'test@test.test',
    userName: 'test1',
    firstName: 'test_first',
    lastName: 'test_second',
    password: 'test_password',
    checkPass: 'test_paasword',
    phone: 'test_phone',
  };
  const mockSession: Record<string, any> = { uid: null };
  const mockLoginDto: LogInDto = {
    email: 'test@test.test',
    password: 'test_password',
  };
  beforeEach(async () => {
    service = {
      create: jest.fn().mockResolvedValue(1),
      logIn: jest.fn().mockResolvedValue(1),
      getMyProfile: jest.fn().mockResolvedValue(1),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('회원가입', () => {
    it('회원가입후 유저고유번호 리턴', async () => {
      const userID = await controller.join(mockCreateUserDto, mockSession);
      expect(service.create).toHaveBeenCalledWith(mockCreateUserDto);
      expect(mockSession.uid).toBe(1);
      expect(userID).toBe(1);
    });
  });

  describe('로그인', () => {
    it('로그인 후 유저고유번호 리턴', async () => {
      const userID = await controller.login(mockLoginDto, mockSession);
      expect(service.logIn).toHaveBeenCalledWith(mockLoginDto);
      expect(mockSession.uid).toBe(1);
      expect(userID).toBe(1);
    });
  });

  describe('로그아웃', () => {
    it('로그아웃 후 session uid null', () => {
      const session = { uid: 1 };
      controller.logOut(session);
      expect(session.uid).toBe(null);
    });
  });

  describe('내 고유번호 가져오기', () => {
    it('내 id num', async () => {
      const myID = await controller.getMyProfile('1');
      expect(myID).toBe(1);
    });
  });
});
