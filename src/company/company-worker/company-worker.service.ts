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
  async getCompanyWorkers(companyId: number) {
    const company = await this.companyRepo.findOne({
      where: { id: companyId },
      relations: {
        companyWorker: {
          vacation: { company: true },
          salary: { company: true },
        },
      },
    });
    if (!company) {
      throw new NotFoundException('회사가 존재하지 않습니다.');
    }
    if (company.companyWorker.length < 1) {
      throw new NotFoundException('사원이 존재하지 않습니다.');
    }
    return company.companyWorker;
  }

  //사원 이름으로 조회
  async getCompanyWorkersByName(id: number, name: string) {
    const workers = await this.getCompanyWorkers(id);
    const worker = workers.find((worker) =>
      `${worker.firstName}${worker.lastName}`.includes(name),
    );
    return worker;
  }

  //사원 등록
  async registCompanyWorkers(id: number, workerID: number) {
    const company = await this.companyRepo.findOne({
      where: { id },
      relations: { companyWorker: true },
    });
    if (!company) {
      throw new NotFoundException('회사가 존재하지 않습니다.');
    }
    const newWorker = await this.userService.findOne(workerID);
    const existsWorker = company.companyWorker.find(
      (workersArgs) => workersArgs.id === newWorker.id,
    );
    if (existsWorker) {
      throw new BadRequestException('이미 존재하는 사원입니다.');
    }
    company.companyWorker.push(newWorker);
    await this.companyRepo.save(company);
    return { msg: '사원이 등록되었습니다.' };
  }

  //사원 삭제
  async removeCompanyWorkers(id: number, workerID: number) {
    const company = await this.companyRepo.findOne({
      where: { id },
      relations: { companyWorker: true },
    });
    if (!company) {
      throw new NotFoundException('회사가 존재하지 않습니다.');
    }
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
    return { msg: '사원이 등록해제되었습니다.' };
  }
}
