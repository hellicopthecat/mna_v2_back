import { IsNumber, IsString } from 'class-validator';

export class CreateCompanyAssetDto {
  @IsNumber()
  budget: number;
  @IsString()
  accountNum: string;
  @IsString()
  accountName: string;
  @IsString()
  accountDesc: string;
}
