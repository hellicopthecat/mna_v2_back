import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyManagerService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}
  //매니저조회
  async getCompanyManager(id: number) {
    const company = await this.companyRepo.findOne({
      where: { id },
      relations: { companyManager: true },
    });
    if (!company) {
      throw new NotFoundException('회사가 존재하지 않습니다.');
    }
    return company.companyManager;
  }
  //매니저 이름으로 찾기
  async getCompanyManagerByName(id: number, name: string) {
    const managerArray = await this.getCompanyManager(id);
    const manager = managerArray.find((worker) =>
      `${worker.firstName}${worker.lastName}`.includes(name),
    );
    return manager;
  }
  async getExceptManager(id: number) {
    const company = await this.companyRepo.findOne({
      where: { id },
      relations: { companyManager: true, companyWorker: true },
    });
    if (!company) {
      throw new NotFoundException('회시가 존재하지 않습니다.');
    }
    const managers = new Set(
      company.companyManager.map((manager) => manager.id),
    );
    const workers = company.companyWorker;
    const filterWokers = workers.filter((worker) => !managers.has(worker.id));
    return filterWokers;
  }
  //매니저 추가
  async addManager(id: number, workerId: number) {
    const worker = await this.userService.findOne(workerId);
    const company = await this.companyRepo.findOne({
      where: { id },
      relations: { companyManager: true },
    });
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
