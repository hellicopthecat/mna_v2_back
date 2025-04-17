import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CompanyService } from '../company.service';

@Injectable()
export class CompanyManagerService {
  constructor(
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}
  //매니저조회
  async getCompanyManager(id: number) {
    const company = await this.companyService.findOneCompany(id);
    return company.companyManager;
  }
  //매니저 이름으로 찾기
  async getCompanyManagerByName(id: number, name: string) {
    const company = await this.companyService.findOneCompany(id);
    const manager = company.companyManager.find((worker) =>
      `${worker.firstName}${worker.lastName}`.includes(name),
    );
    return manager;
  }

  //매니저 추가
  async addManager(id: number, workerId: number) {
    const worker = await this.userService.findOne(workerId);
    const company = await this.companyRepo.findOne({ where: { id } });
    if (!company) {
      return new NotFoundException('회사가 존재하지 않습니다.');
    }
    company.companyManager.push(worker);
    await this.companyRepo.save(company);
    return { msg: '매니저가 추가되었습니다.' };
  }
  //매니저 삭제
  async removeManager(id: number, workerId: number) {
    const worker = await this.userService.findOne(workerId);
    const company = await this.companyRepo.findOne({ where: { id } });
    if (!company) {
      return new NotFoundException('회사가 존재하지 않습니다.');
    }
    company.companyManager = company.companyManager.filter(
      (user) => user.id !== worker.id,
    );
    await this.companyRepo.save(company);
    return { msg: '매니저가 성공적으로 삭제되었습니다.' };
  }
}
