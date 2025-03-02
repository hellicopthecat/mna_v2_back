import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  companyName: string;
  @IsString()
  companyLogo: string;
  @IsString()
  country: string;
  @IsString()
  addressCity: string;
  @IsString()
  streetAddress: string;
  @IsString()
  restAddress: string;
  @IsString()
  addressNum: string;
}
