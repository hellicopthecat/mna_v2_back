import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenService } from 'src/auth/token.service';
import { Company } from 'src/company/entities/company.entity';
import { Vacation } from 'src/vacation/entities/vacation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyWorkersVacationService {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
    @InjectRepository(Vacation) private vacationRepo: Repository<Vacation>,
    private readonly tokenService: TokenService,
  ) {}
  //사내직원 휴가데이터 보기
  async getCompanyWorkerVacation(companyId: number) {
    const company = await this.companyRepo.findOne({
      where: { id: companyId },
      relations: { workerVacation: { user: true } },
    });
    if (!company) {
      throw new NotFoundException('회사를 찾지 못했습니다.');
    }
    if (company.workerVacation.length < 1) {
      throw new NotFoundException('생성된 휴가가 없습니다.');
    }
    return company.workerVacation;
  }
  //휴가 모델이 없는 직원들 불러오기
  async getWorkerCreateVacation(companyId: number) {
    const company = await this.companyRepo.findOne({
      where: { id: companyId },
      relations: { companyWorker: { vacation: { company: true } } },
    });
    if (!company) {
      throw new NotFoundException('회사를 찾지 못했습니다.');
    }
    const whoHasNotVacationModel = company.companyWorker.filter((worker) => {
      const whoHasVacationModel = worker.vacation.some(
        (vacation) => vacation.company.id === companyId,
      );
      return !whoHasVacationModel;
    });
    return whoHasNotVacationModel;
  }
  //이 직장의 나의 휴가 보기
  async getMyVacationAtThisCompany(companyId: number, token: string) {
    const { userId } = await this.tokenService.verifiedRefreshToken(token);
    const vacation = await this.vacationRepo.findOne({
      where: { company: { id: companyId }, user: { id: +userId } },
      relations: { user: true, company: true },
    });
    if (!vacation) {
      throw new NotFoundException('휴가모델을 찾지 못했습니다.');
    }
    return vacation;
  }
}
