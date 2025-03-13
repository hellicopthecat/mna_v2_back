import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { TPaymentSwitch } from '../entities/income-expend.entity';

export class CreateIncomeExpendDto {
  @IsBoolean()
  incomeTrue: boolean;
  @IsString()
  title: string;
  @IsNumber()
  cost: number;
  @IsString()
  businessDate: string;
  @IsString()
  paymentType: string;
  @IsString()
  businessDesc: string;
  @IsEnum(TPaymentSwitch)
  paymentsDone: TPaymentSwitch;
}
