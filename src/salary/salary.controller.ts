import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalaryService } from './salary.service';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post()
  create(
    @Param('userId') userId: string,
    @Body() createSalaryDto: CreateSalaryDto,
  ) {
    return this.salaryService.createSalary(Number(userId), createSalaryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salaryService.findOneSalary(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalaryDto: UpdateSalaryDto) {
    return this.salaryService.updateSalary(+id, updateSalaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salaryService.removeSalary(+id);
  }
}
