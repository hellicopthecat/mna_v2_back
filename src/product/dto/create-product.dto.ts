import { IsEnum, IsString } from 'class-validator';
import { TPaymentSwitch } from 'src/income-expend/entities/income-expend.entity';

export class CreateProductDto {
  @IsString()
  transactionTitle: string; // 거래제목
  @IsString()
  itemName: string;
  @IsString()
  itemModelName: string;
  @IsString()
  itemPhoto: string;
  @IsString()
  itemType: string;
  @IsString()
  itemCount: string;
  @IsString()
  itemPrice: string;
  @IsString()
  itemDesc: string;
  //income-expend
  @IsString()
  incomeTrue: string;
  @IsString()
  paymentType: string;
  @IsEnum(TPaymentSwitch)
  paymentsDone: TPaymentSwitch;
}
