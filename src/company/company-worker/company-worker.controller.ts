import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CompanyWorkerService } from './company-worker.service';
import { ManagerGuard } from 'src/guards/manager/manager.guard';
import { AuthDecorator } from 'src/auth/auth-decorator/auth-decorator.decorator';

@Controller('company-workers')
@UseGuards(AuthGuard)
export class CompanyWorkerController {
  constructor(private readonly companyWorkerService: CompanyWorkerService) {}
  //회사 사원 불러오기
  @Get(':companyId')
  async getCompanyWorkers(@Param('companyId') comapnyId: string) {
    return await this.companyWorkerService.getCompanyWorkers(Number(comapnyId));
  }
  @Get(':companyId/vacations')
  @UseGuards(ManagerGuard)
  async getCompanyWorkersVacation(@Param('companyId') comapnyId: string) {
    return await this.companyWorkerService.getCompanyWorkersVacation(
      Number(comapnyId),
    );
  }
  @Get(':companyId/myVacation')
  async getThisCompanyVacation(
    @Param('companyId') companyId: string,
    @AuthDecorator() token: string,
  ) {
    return await this.companyWorkerService.getThisCompanyVacation(
      Number(companyId),
      token,
    );
  }
  //사원 이름으로 조회
  @Get(':companyId')
  async getCompanyWorkerByName(
    @Param('companyId') comapnyId: string,
    name: string,
  ) {
    return await this.companyWorkerService.getCompanyWorkersByName(
      Number(comapnyId),
      name,
    );
  }
  //사원 등록
  @Patch(':companyId')
  @UseGuards(ManagerGuard)
  async registCompanyWorkers(
    @Param('companyId') comapnyId: string,
    workerID: string,
  ) {
    return await this.companyWorkerService.registCompanyWorkers(
      Number(comapnyId),
      Number(workerID),
    );
  }
  //사원 등록 해제
  @Delete(':companyId')
  @UseGuards(ManagerGuard)
  async removeCompanyWorkers(
    @Param('companyId') comapnyId: string,
    workerID: string,
  ) {
    return await this.companyWorkerService.removeCompanyWorkers(
      Number(comapnyId),
      Number(workerID),
    );
  }
}
