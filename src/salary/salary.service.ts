import { Injectable } from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salary } from './entities/salary.entity';
import { UserService } from 'src/user/user.service';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class SalaryService {
  constructor(
    @InjectRepository(Salary) private salaryRepo: Repository<Salary>,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
  ) {}
  async createSalary(
    userId: number,
    companyId: number,
    createSalaryDto: CreateSalaryDto,
  ) {
    const user = await this.userService.findOne(userId);
    const company = await this.companyService.findOneCompany(companyId);
    const salary = this.salaryRepo.create({
      preTaxMonthlySalary: Number(createSalaryDto.preTaxMonthlySalary),
      familyCount: Number(createSalaryDto.familyCount),
      childCount: Number(createSalaryDto.childCount),
      user,
      company,
    });
    await this.salaryRepo.save(salary);
    return { msg: '휴가를 생성하였습니다.' };
  }

  async findOneSalary(salaryId: number) {
    return await this.salaryRepo.findOneBy({ id: salaryId });
  }

  async updateSalary(salaryId: number, updateSalaryDto: UpdateSalaryDto) {
    await this.salaryRepo.update(
      { id: salaryId },
      {
        preTaxMonthlySalary: Number(updateSalaryDto.preTaxMonthlySalary),
        familyCount: Number(updateSalaryDto.familyCount),
        childCount: Number(updateSalaryDto.childCount),
      },
    );
    return { msg: '급여가 업데이트 되었습니다.' };
  }

  async removeSalary(salaryId: number) {
    await this.salaryRepo.delete({ id: salaryId });
    return { msg: '급여정보가 삭제되었습니다.' };
  }
}
