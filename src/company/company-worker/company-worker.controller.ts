import {
  Body,
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
import { RegistWorkerDto } from './dto/regist-worker.dto';

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
  @Post('regist')
  @UseGuards(ManagerGuard)
  async registCompanyWorkers(@Body() registWorkerDto: RegistWorkerDto) {
    return await this.companyWorkerService.registCompanyWorkers(
      Number(registWorkerDto.companyId),
      Number(registWorkerDto.workerId),
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
