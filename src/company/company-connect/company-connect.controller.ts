import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ManagerGuard } from 'src/guards/manager/manager.guard';
import { CompanyConnectService } from './company-connect.service';

@Controller('company')
@UseGuards(AuthGuard)
@UseGuards(ManagerGuard)
export class CompanyConnectController {
  constructor(private readonly companyConnectService: CompanyConnectService) {}
  @Patch(':id/connect')
  async connectCompany(@Param('id') id: string, t_companyID: string) {
    return this.companyConnectService.connectCompany(
      Number(id),
      Number(t_companyID),
    );
  }
  @Patch(':id/disconnect')
  async disConnectCompany(@Param('id') id: string, t_companyID: string) {
    return this.companyConnectService.disConnectCompany(
      Number(id),
      Number(t_companyID),
    );
  }
}
