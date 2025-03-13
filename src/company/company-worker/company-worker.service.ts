import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CompanyService } from '../company.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CompanyWorkerService {
  constructor(
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}
  //사원 조회
  async getCompanyWorkers(id: number) {
    const company = await this.companyService.findOneCompany(id);
    return company?.companyWorker;
  }
  //사원 이름으로 조회
  async getCompanyWorkersByName(id: number, name: string) {
    const comapny = await this.companyService.findOneCompany(id);
    const worker = comapny.companyWorker.find((worker) =>
      `${worker.firstName}${worker.lastName}`.includes(name),
    );
    return worker;
  }
  //사원 등록
  async registCompanyWorkers(id: number, workerID: number) {
    const company = await this.companyService.findOneCompany(id);
    const worker = await this.userService.findOne(workerID);
    const existsWorker = company.companyWorker.some(
      (workersArgs) => workersArgs.id === worker.id,
    );
    if (existsWorker) {
      throw new BadRequestException('이미 존재하는 사원입니다.');
    }
    company?.companyWorker.push(worker);
    await this.companyRepo.save(company);
    return { msg: '사원이 등록되었습니다.' };
  }
  //사원 삭제
  async removeCompanyWorkers(id: number, workerID: number) {
    const company = await this.companyService.findOneCompany(id);
    const worker = await this.userService.findOne(workerID);
    const exsitsWorker = company.companyWorker.some(
      (workerArgs) => workerArgs.id === worker.id,
    );
    if (!exsitsWorker) {
      throw new NotFoundException('사원이 존재하지 않습니다.');
    }
    company.companyWorker = company?.companyWorker.filter(
      (workerArgs) => workerArgs.id !== worker.id,
    );
    await this.companyRepo.save(company);
    return { msg: '사원이 등록되었습니다.' };
  }
}
