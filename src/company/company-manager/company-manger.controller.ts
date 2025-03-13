import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { CompanyManagerService } from './company-manager.service';
import { ManagerGuard } from 'src/guards/manager/manager.guard';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('company')
@UseGuards(AuthGuard)
@UseGuards(ManagerGuard)
export class CompanyMangerController {
  constructor(private readonly companyManagerService: CompanyManagerService) {}
  @Get(':id')
  async getCompanyManager(@Param('id') id: string) {
    return this.companyManagerService.getCompanyManager(Number(id));
  }
  @Get(':id')
  async getCompanyManagerByName(@Param('id') id: string, name: string) {
    return this.companyManagerService.getCompanyManagerByName(Number(id), name);
  }
  @Patch(':id')
  addManager(@Param('id') id: string, workerId: string) {
    return this.companyManagerService.addManager(Number(id), Number(workerId));
  }
  @Patch(':id')
  removeManager(@Param('id') id: string, workerId: string) {
    return this.companyManagerService.removeManager(
      Number(id),
      Number(workerId),
    );
  }
}
