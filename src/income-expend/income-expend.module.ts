import { Module } from '@nestjs/common';
import { IncomeExpendService } from './income-expend.service';
import { IncomeExpendController } from './income-expend.controller';

@Module({
  controllers: [IncomeExpendController],
  providers: [IncomeExpendService],
})
export class IncomeExpendModule {}
