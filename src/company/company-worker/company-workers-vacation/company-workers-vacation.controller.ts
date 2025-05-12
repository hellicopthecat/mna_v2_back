import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CompanyWorkersVacationService } from './company-workers-vacation.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ManagerGuard } from 'src/guards/manager/manager.guard';
import { Serialize } from 'src/interceptors/serialize/serialize.interceptor';
import { VacationDto } from 'src/vacation/dto/vacation.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthDecorator } from 'src/auth/auth-decorator/auth-decorator.decorator';

@Controller('company-workers-vacation')
@UseGuards(AuthGuard)
export class CompanyWorkersVacationController {
  constructor(
    private readonly companyWorkerVacationService: CompanyWorkersVacationService,
  ) {}
  //사내직원 휴가데이터 보기
  @Get(':companyId')
  @UseGuards(ManagerGuard)
  @Serialize(VacationDto)
  async getCompanyWorkerVacation(@Param('companyId') companyId: string) {
    return await this.companyWorkerVacationService.getCompanyWorkerVacation(
      Number(companyId),
    );
  }
  //휴가 모델이 없는 직원들 불러오기
  @Get('create-worker-vacation/:companyId')
  @UseGuards(ManagerGuard)
  @Serialize(UserDto)
  async getWorkerCreateVacation(@Param('companyId') companyId: string) {
    return await this.companyWorkerVacationService.getWorkerCreateVacation(
      Number(companyId),
    );
  }
  //이 직장의 나의 휴가 보기
  @Get('my-vacation/:companyId')
  async getMyVacationThisCompany(
    @Param('companyId') companyId: string,
    @AuthDecorator() token: string,
  ) {
    return await this.companyWorkerVacationService.getMyVacationAtThisCompany(
      Number(companyId),
      token,
    );
  }
}
