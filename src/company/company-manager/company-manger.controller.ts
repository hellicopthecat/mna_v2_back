import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CompanyManagerService } from './company-manager.service';
import { ManagerGuard } from 'src/guards/manager/manager.guard';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Serialize } from 'src/interceptors/serialize/serialize.interceptor';
import { UserDto } from 'src/user/dto/user.dto';
import { AddManagerDto } from './dto/add-manager.dto';

@Controller('company')
@UseGuards(AuthGuard)
@UseGuards(ManagerGuard)
@Serialize(UserDto)
export class CompanyMangerController {
  constructor(private readonly companyManagerService: CompanyManagerService) {}
  @Get('manager/:id')
  async getCompanyManager(@Param('id') id: string) {
    return this.companyManagerService.getCompanyManager(Number(id));
  }
  @Get('manager/:id')
  async getCompanyManagerByName(@Param('id') id: string, name: string) {
    return this.companyManagerService.getCompanyManagerByName(Number(id), name);
  }
  @Get('exceptManager/:id')
  async getExceptManager(@Param('id') id: string) {
    return await this.companyManagerService.getExceptManager(Number(id));
  }
  @Post('addManager')
  addManager(@Body() addManaerDto: AddManagerDto) {
    return this.companyManagerService.addManager(
      Number(addManaerDto.companyId),
      Number(addManaerDto.workerId),
    );
  }
  @Patch('manager/:id')
  removeManager(@Param('id') id: string, workerId: string) {
    return this.companyManagerService.removeManager(
      Number(id),
      Number(workerId),
    );
  }
}
