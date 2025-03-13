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
  // 회사생성
  @Post()
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @AuthDecorator() userId: string,
  ) {
    return this.companyService.createCompany(createCompanyDto, Number(userId));
  }
  // 전체회사찾기
  @Get()
  findAll() {
    return this.companyService.findAllCompany();
  }
  // id로 회사 찾기
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOneCompany(+id);
  }
  // 이름으로 회사 찾기
  @Get(':name')
  findOneByName(@Param('name') name: string) {
    return this.companyService.findONeByName(name);
  }
  //회사정보수정
  @Patch(':id')
  @UseGuards(ManagerGuard)
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.updateCompany(+id, updateCompanyDto);
  }
  //회사 삭제
  @Delete(':id')
  @UseGuards(OwnerGuard)
  remove(@Param('id') id: string) {
    return this.companyService.removeCompany(+id);
  }
}
