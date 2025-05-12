import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenService } from 'src/auth/token.service';
import { Company } from 'src/company/entities/company.entity';
import { Salary } from 'src/salary/entities/salary.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyWorkerSalaryService {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
    @InjectRepository(Salary) private salaryRepo: Repository<Salary>,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  //급여모델없는 사원리스트
  async getWorkerWhoCreateSalary(companyId: number) {
    const company = await this.companyRepo.findOne({
      where: { id: companyId },
      relations: {
        companyWorker: { salary: { company: true } },
      },
    });
    if (!company) {
      throw new NotFoundException('회사가 존재하지 않습니다.');
    }
    const whoHasNotSalaryData = company.companyWorker.filter((worker) => {
      const whoHasSalaryData = worker.salary.some(
        (salary) => salary.company.id === companyId,
      );
      return !whoHasSalaryData;
    });
    return whoHasNotSalaryData;
  }

  //전 사원 급여정보보기
  async getCompanyWorkersSalary(companyId: number) {
    const company = await this.companyRepo.findOne({
      where: { id: companyId },
      relations: { workerSalary: { user: true } },
    });
    if (!company) {
      throw new NotFoundException('회사가 존재하지 않습니다.');
    }
    if (company.workerSalary.length < 1) {
      throw new NotFoundException('생성된 직원의 급여모델이 없습니다.');
    }
    return company.workerSalary;
  }

  //현 회사 나의 급여정보보기
  async getMySalaryThisCompany(companId: number, token: string) {
    const { userId } = await this.tokenService.verifiedRefreshToken(token);
    const mySalaryThisCompany = await this.salaryRepo.findOne({
      where: { user: { id: Number(userId) }, company: { id: companId } },
      relations: { user: true, company: true },
    });
    if (!mySalaryThisCompany) {
      throw new NotFoundException('급여정보가 없습니다.');
    }
    return mySalaryThisCompany;
  }
}
