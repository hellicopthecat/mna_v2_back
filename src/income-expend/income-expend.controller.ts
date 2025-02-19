import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncomeExpendService } from './income-expend.service';
import { CreateIncomeExpendDto } from './dto/create-income-expend.dto';
import { UpdateIncomeExpendDto } from './dto/update-income-expend.dto';

@Controller('income-expend')
export class IncomeExpendController {
  constructor(private readonly incomeExpendService: IncomeExpendService) {}

  @Post()
  create(@Body() createIncomeExpendDto: CreateIncomeExpendDto) {
    return this.incomeExpendService.create(createIncomeExpendDto);
  }

  @Get()
  findAll() {
    return this.incomeExpendService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomeExpendService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncomeExpendDto: UpdateIncomeExpendDto) {
    return this.incomeExpendService.update(+id, updateIncomeExpendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomeExpendService.remove(+id);
  }
}
