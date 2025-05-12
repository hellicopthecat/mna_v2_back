import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { TokenService } from 'src/auth/token.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();
    if (users.length < 1) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    return user;
  }
  async findOneByUserName(userName: string, token: string) {
    if (/\\/.test(userName)) {
      throw new BadRequestException('\\ 는 사용할수 없습니다.');
    }
    const { userId } = await this.tokenService.verifiedRefreshToken(token);
    const user = await this.userRepository.findBy({
      lastName: Like(`%${userName}%`),
    });
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    const filterUser = user.filter((user) => user.id !== Number(userId));
    return filterUser;
  }
  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return await this.userRepository.update(
      { id: user.id },
      { ...updateUserDto },
    );
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      return;
    }
    return await this.userRepository.delete({ id });
  }
}
