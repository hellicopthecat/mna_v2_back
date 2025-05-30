import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ManagerGuard } from 'src/guards/manager/manager.guard';
import { CompanyConnectService } from './company-connect.service';
import { ConnectCompanyDto } from './dto/connect-company.dto';

@Controller('company-connect')
@UseGuards(AuthGuard)
export class CompanyConnectController {
  constructor(private readonly companyConnectService: CompanyConnectService) {}
  @Get('find/:companyId/:companyName')
  async getCompanyExceptConnectedCompany(
    @Param('companyId') companyId: string,
    @Param('companyName') companyName: string,
  ) {
    return await this.companyConnectService.getCompanyExceptConnectedCompany(
      Number(companyId),
      companyName,
    );
  }
  @Get('connected/:id')
  async getConnectedCompany(@Param('id') id: string) {
    return await this.companyConnectService.getConnectedCompany(Number(id));
  }

  @Get('connecting/:id')
  async getConnectingCompany(@Param('id') id: string) {
    return await this.companyConnectService.getConnectingCompany(Number(id));
  }

  @Put('connect')
  @UseGuards(ManagerGuard)
  async connectCompany(@Body() connectCompanyDto: ConnectCompanyDto) {
    return this.companyConnectService.connectCompany(
      Number(connectCompanyDto.myCompanyId),
      Number(connectCompanyDto.targetCompanyId),
    );
  }
  @Put('disconnect')
  @UseGuards(ManagerGuard)
  async disConnectCompany(@Body() connectCompanyDto: ConnectCompanyDto) {
    return this.companyConnectService.disConnectCompany(
      Number(connectCompanyDto.myCompanyId),
      Number(connectCompanyDto.targetCompanyId),
    );
  }
}
