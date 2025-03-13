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

@Controller('company')
@UseGuards(AuthGuard)
export class CompanyWorkerController {
  constructor(private readonly companyWorkerService: CompanyWorkerService) {}
  //회사 사원 불러오기
  @Get('/:id/company-worker')
  async getCompanyWorkers(@Param('id') id: string) {
    return await this.companyWorkerService.getCompanyWorkers(Number(id));
  }
  //사원 이름으로 조회
  @Get('/:id/company-worker')
  async getCompanyWorkerByName(@Param('id') id: string, name: string) {
    return await this.companyWorkerService.getCompanyWorkersByName(
      Number(id),
      name,
    );
  }
  //사원 등록
  @Patch('/:id/company-worker')
  @UseGuards(ManagerGuard)
  async registCompanyWorkers(@Param('id') id: string, workerID: string) {
    return await this.companyWorkerService.registCompanyWorkers(
      Number(id),
      Number(workerID),
    );
  }
  //사원 등록 해제
  @Delete('/:id/company-worker')
  @UseGuards(ManagerGuard)
  async removeCompanyWorkers(@Param('id') id: string, workerID: string) {
    return await this.companyWorkerService.removeCompanyWorkers(
      Number(id),
      Number(workerID),
    );
  }
}
