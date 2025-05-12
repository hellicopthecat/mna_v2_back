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
import { SalaryService } from './salary.service';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ManagerGuard } from 'src/guards/manager/manager.guard';

@Controller('salary')
@UseGuards(AuthGuard)
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}
  @Post(':companyId/:userId')
  @UseGuards(ManagerGuard)
  create(
    @Param('companyId') companyId: string,
    @Param('userId') userId: string,
    @Body() createSalaryDto: CreateSalaryDto,
  ) {
    return this.salaryService.createSalary(
      Number(userId),
      Number(companyId),
      createSalaryDto,
    );
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
