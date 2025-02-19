import { PartialType } from '@nestjs/mapped-types';
import { CreateIncomeExpendDto } from './create-income-expend.dto';

export class UpdateIncomeExpendDto extends PartialType(CreateIncomeExpendDto) {}
