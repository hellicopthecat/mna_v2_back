import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LogInDto } from './dto/log-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  //Create
  async create(createUserDto: CreateUserDto) {
    const existsUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existsUser) {
      return new BadRequestException('이미 존재하는 유저입니다.');
    }
    if (createUserDto.password !== createUserDto.checkPass) {
      return new BadRequestException('비밀번호가 일치하지 않습니다.');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer;
    const password = salt + '.' + hash.toString('hex');

    const user = this.userRepository.create({
      ...createUserDto,
      password,
    });
    await this.userRepository.save(user);
    return user.id;
  }

  async logIn(loginDto: LogInDto) {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    const [salt, hashed] = user.password.split('.');
    const hash = (await scrypt(loginDto.password, salt, 32)) as Buffer;
    if (hashed !== hash.toString('hex')) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }
    return user.id;
  }
  async getMyProfile(id: number) {
    if (!id) {
      throw new BadRequestException('로그인을 해주세요.');
    }
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
