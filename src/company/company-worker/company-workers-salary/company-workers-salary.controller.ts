import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ManagerGuard } from 'src/guards/manager/manager.guard';
import { CompanyWorkerSalaryService } from './company-workers-salary.service';
import { Serialize } from 'src/interceptors/serialize/serialize.interceptor';
import { UserDto } from 'src/user/dto/user.dto';
import { SalaryDto } from 'src/salary/dto/salary.dto';
import { AuthDecorator } from 'src/auth/auth-decorator/auth-decorator.decorator';

@Controller('company-workers-salary')
@UseGuards(AuthGuard)
@UseGuards(ManagerGuard)
export class CompanyWorkerSalaryController {
  constructor(
    private readonly companyWorkerSalaryService: CompanyWorkerSalaryService,
  ) {}
  //전 사원 급여정보보기
  @Get(':companyId')
  @Serialize(SalaryDto)
  async getCompanyWorkersSalary(@Param('companyId') companyId: string) {
    return await this.companyWorkerSalaryService.getCompanyWorkersSalary(
      Number(companyId),
    );
  }
  //급여모델없는 사원리스트
  @Get('create-worker-salary/:companyId')
  @Serialize(UserDto)
  async getWorkerWhoCreateSalary(@Param('companyId') companyId: string) {
    return await this.companyWorkerSalaryService.getWorkerWhoCreateSalary(
      Number(companyId),
    );
  }
  @Get('mySalary/:companyId')
  @Serialize(SalaryDto)
  async getMySalaryThisCompany(
    @Param('companyId') companyId: string,
    @AuthDecorator() token: string,
  ) {
    return await this.companyWorkerSalaryService.getMySalaryThisCompany(
      Number(companyId),
      token,
    );
  }
}
