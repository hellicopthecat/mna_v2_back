import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CompanyWorkerService } from './company-worker.service';
import { ManagerGuard } from 'src/guards/manager/manager.guard';
import { Serialize } from 'src/interceptors/serialize/serialize.interceptor';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('company-workers')
@UseGuards(AuthGuard)
export class CompanyWorkerController {
  constructor(private readonly companyWorkerService: CompanyWorkerService) {}
  //회사 사원 불러오기
  @Get(':companyId')
  @Serialize(UserDto)
  async getCompanyWorkers(@Param('companyId') comapnyId: string) {
    return await this.companyWorkerService.getCompanyWorkers(Number(comapnyId));
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
  @Post(':companyId/:workerId')
  @UseGuards(ManagerGuard)
  async registCompanyWorkers(
    @Param('companyId') comapnyId: string,
    @Param('workerId') workerId: string,
  ) {
    return await this.companyWorkerService.registCompanyWorkers(
      Number(comapnyId),
      Number(workerId),
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
