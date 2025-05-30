import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LogInDto } from './dto/log-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { TokenService } from './token.service';
import { deCryptPassword, enCryptPassword } from './auth-util/crypt.util';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
    private readonly tokenService: TokenService,
  ) {}
  //Create
  async create(createUserDto: CreateUserDto) {
    const existsUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existsUser) {
      throw new BadRequestException('이미 존재하는 유저입니다.');
    }
    if (createUserDto.password !== createUserDto.checkPass) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }
    const password = await enCryptPassword(createUserDto.password);
    const user = this.userRepository.create({
      ...createUserDto,
      password,
    });
    await this.userRepository.save(user);

    const accessToken = await this.tokenService.generateAccessToken({
      userId: user.id,
    });
    const refreshToken = await this.tokenService.generateRefreshToken({
      userId: user.id,
    });

    await this.userService.update(user.id, { refreshToken });
    return { userId: user.id, accessToken, refreshToken };
  }
  //Login
  async logIn(loginDto: LogInDto) {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    const ok = await deCryptPassword(loginDto.password, user.password);
    if (!ok) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }
    const accessToken = await this.tokenService.generateAccessToken({
      userId: user.id,
    });
    const refreshToken = await this.tokenService.generateRefreshToken({
      userId: user.id,
    });
    await this.userService.update(user.id, { refreshToken });
    return { userId: user.id, accessToken, refreshToken };
  }

  async logOut(token: string) {
    const { userId } = await this.tokenService.verifiedRefreshToken(token);
    await this.userService.update(+userId, { refreshToken: '' });
    return { msg: '로그아웃되었습니다.' };
  }

  async getMyProfile(token: string) {
    if (!token) {
      throw new UnauthorizedException('로그인을 해주세요.');
    }
    const { userId } = await this.tokenService.verifiedAccessToken(token);
    const user = await this.userService.findOne(Number(userId));
    return user;
  }
  async getMyCompany(token: string) {
    if (!token) {
      throw new UnauthorizedException('로그인을 해주세요.');
    }
    const { userId } = await this.tokenService.verifiedAccessToken(token);
    const company = this.companyService.findOwnCompany(Number(userId));
    return company;
  }
}
