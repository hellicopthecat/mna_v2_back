import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { TPaymentSwitch } from 'src/income-expend/entities/income-expend.entity';

export class CreateProductDto {
  @IsString()
  transactionTitle: string; // 거래재목
  @IsString()
  itemName: string;
  @IsString()
  itemModelName: string;
  @IsString()
  itemPhoto: string;
  @IsString()
  itemType: string;
  @IsNumber()
  itemCount: number;
  @IsNumber()
  itemPrice: number;
  @IsString()
  itemDesc: string;
  //income-expend
  @IsBoolean()
  incomeTure: boolean;
  @IsString()
  paymentType: string;
  @IsEnum(TPaymentSwitch)
  paymentsDone: TPaymentSwitch;
}
