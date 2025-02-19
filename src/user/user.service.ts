import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();
    if (users.length < 1) {
      throw new NotFoundException('user not found');
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
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
