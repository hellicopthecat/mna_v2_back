import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ManagerGuard } from 'src/guards/manager/manager.guard';
import { OwnerGuard } from 'src/guards/owner/owner.guard';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { AuthDecorator } from 'src/auth/auth-decorator/auth-decorator.decorator';

@Controller('company')
@UseGuards(AuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @AuthDecorator() userId: string,
  ) {
    return this.companyService.createCompany(createCompanyDto, Number(userId));
  }

  @Get()
  findAll() {
    return this.companyService.findAllCompany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOneCompany(+id);
  }
  @Patch(':id')
  @UseGuards(ManagerGuard)
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.updateCompany(+id, updateCompanyDto);
  }

  @Delete(':id')
  @UseGuards(OwnerGuard)
  remove(@Param('id') id: string) {
    return this.companyService.removeCompany(+id);
  }
  @Patch(':id')
  @UseGuards(ManagerGuard)
  addManager(@Param('id') id: string, workerId: string) {
    return this.companyService.addManager(Number(id), Number(workerId));
  }
  @Patch(':id')
  @UseGuards(ManagerGuard)
  removeManager(@Param('id') id: string, workerId: string) {
    return this.companyService.removeManager(Number(id), Number(workerId));
  }
}
