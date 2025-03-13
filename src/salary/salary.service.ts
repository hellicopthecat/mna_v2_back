import { Injectable } from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salary } from './entities/salary.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SalaryService {
  constructor(
    @InjectRepository(Salary) private salaryRepo: Repository<Salary>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly userService: UserService,
  ) {}
  async createSalary(userId: number, createSalaryDto: CreateSalaryDto) {
    const salary = this.salaryRepo.create(createSalaryDto);
    await this.salaryRepo.save(salary);
    const user = await this.userService.findOne(userId);
    user.salary.push(salary);
    await this.userRepo.save(user);
    return { msg: '휴가를 생성하였습니다.' };
  }

  async findOneSalary(salaryId: number) {
    return await this.salaryRepo.findOneBy({ id: salaryId });
  }

  async updateSalary(salaryId: number, updateSalaryDto: UpdateSalaryDto) {
    await this.salaryRepo.update({ id: salaryId }, updateSalaryDto);
    return { msg: '급여가 업데이트 되었습니다.' };
  }

  async removeSalary(salaryId: number) {
    await this.salaryRepo.delete({ id: salaryId });
    return { msg: '급여정보가 삭제되었습니다.' };
  }
}
