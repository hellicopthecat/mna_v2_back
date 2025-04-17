import { IsEnum, IsString } from 'class-validator';
import { TPaymentSwitch } from '../entities/income-expend.entity';

export class CreateIncomeExpendDto {
  @IsString()
  incomeTrue: string;
  @IsString()
  title: string;
  @IsString()
  cost: string;
  @IsString()
  businessDate: string;
  @IsString()
  paymentType: string;
  @IsString()
  businessDesc: string;
  @IsEnum(TPaymentSwitch)
  paymentsDone: TPaymentSwitch;
}
