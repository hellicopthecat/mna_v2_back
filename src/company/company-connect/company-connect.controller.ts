import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ManagerGuard } from 'src/guards/manager/manager.guard';
import { CompanyConnectService } from './company-connect.service';

@Controller('company-connect')
@UseGuards(AuthGuard)
@UseGuards(ManagerGuard)
export class CompanyConnectController {
  constructor(private readonly companyConnectService: CompanyConnectService) {}

  @Get('connected/:id')
  async getConnectedCompany(@Param('id') id: string) {
    return await this.companyConnectService.getConnectedCompany(Number(id));
  }

  @Get()
  async getConnectingCompany() {}

  @Put('connect/:id')
  async connectCompany(@Param('id') id: string, t_companyID: string) {
    return this.companyConnectService.connectCompany(
      Number(id),
      Number(t_companyID),
    );
  }
  @Put('disconnect/:id')
  async disConnectCompany(@Param('id') id: string, t_companyID: string) {
    return this.companyConnectService.disConnectCompany(
      Number(id),
      Number(t_companyID),
    );
  }
}
