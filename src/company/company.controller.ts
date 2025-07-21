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
    @AuthDecorator() token: string,
  ) {
    return this.companyService.createCompany(createCompanyDto, token);
  }
  // 전체회사찾기
  @Get()
  findAll() {
    return this.companyService.findAllCompany();
  }
  // 이름으로 회사 찾기
  @Get('/findByName/:companyName')
  findOneByName(@Param('companyName') companyName: string) {
    return this.companyService.findOneByName(companyName);
  }
  @Get('/joined')
  findJoinedCompany(@AuthDecorator() token: string) {
    return this.companyService.findJoinedCompany(token);
  }
  // id로 회사 찾기
  @Get('/:id')
  findOneCompany(@Param('id') id: string) {
    return this.companyService.findOneCompany(Number(id));
  }

  //회사정보수정
  @Patch('/:id')
  @UseGuards(ManagerGuard)
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.updateCompany(+id, updateCompanyDto);
  }
  //회사 삭제
  @Delete('/:id')
  @UseGuards(OwnerGuard)
  remove(@Param('id') id: string) {
    return this.companyService.removeCompany(+id);
  }
}
