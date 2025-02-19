import { Injectable } from '@nestjs/common';
import { CreateIncomeExpendDto } from './dto/create-income-expend.dto';
import { UpdateIncomeExpendDto } from './dto/update-income-expend.dto';

@Injectable()
export class IncomeExpendService {
  create(createIncomeExpendDto: CreateIncomeExpendDto) {
    return 'This action adds a new incomeExpend';
  }

  findAll() {
    return `This action returns all incomeExpend`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incomeExpend`;
  }

  update(id: number, updateIncomeExpendDto: UpdateIncomeExpendDto) {
    return `This action updates a #${id} incomeExpend`;
  }

  remove(id: number) {
    return `This action removes a #${id} incomeExpend`;
  }
}
