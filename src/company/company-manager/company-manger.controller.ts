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
import { AuthDecorator } from 'src/auth/auth-decorator/auth-decorator.decorator';
import { OwnerGuard } from 'src/guards/owner/owner.guard';

@Controller('company-manager')
@UseGuards(AuthGuard)
@UseGuards(ManagerGuard)
export class CompanyMangerController {
  constructor(private readonly companyManagerService: CompanyManagerService) {}

  @Post('addManager')
  addManager(@Body() addManaerDto: AddManagerDto) {
    return this.companyManagerService.addManager(
      Number(addManaerDto.companyId),
      Number(addManaerDto.workerId),
    );
  }

  @Get('manager/:id/:name')
  @Serialize(UserDto)
  async getCompanyManagerByName(
    @Param('id') id: string,
    @Param('name') name: string,
  ) {
    return this.companyManagerService.getCompanyManagerByName(Number(id), name);
  }

  @Patch('manager/:id/:workerId')
  removeManager(@Param('id') id: string, @Param('workerId') workerId: string) {
    return this.companyManagerService.removeManager(
      Number(id),
      Number(workerId),
    );
  }

  @Get('exceptManager/:id')
  @Serialize(UserDto)
  async getExceptManager(@Param('id') id: string) {
    return await this.companyManagerService.getExceptManager(Number(id));
  }

  @Get('isManager/:id')
  async amImanager(@AuthDecorator() token: string, @Param('id') id: string) {
    return await this.companyManagerService.amImanager(token, Number(id));
  }

  @Get('isOwner/:id')
  @UseGuards(OwnerGuard)
  async isOwner(@AuthDecorator() token: string, @Param('id') id: string) {
    return await this.companyManagerService.isOwner(token, id);
  }
  @Get(':id')
  @Serialize(UserDto)
  async getCompanyManager(@Param('id') id: string) {
    return this.companyManagerService.getCompanyManager(Number(id));
  }
}
