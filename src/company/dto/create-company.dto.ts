import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  companyName: string;
  @IsString()
  companyLogo: string;
  @IsString()
  zonecode: string;
  @IsString()
  sido: string;
  @IsString()
  sigungu: string;
  @IsString()
  roadname: string;
  @IsString()
  roadAddress: string;
  @IsString()
  restAddress: string;
  @IsString({})
  bname: string;
  @IsString({})
  bname1: string;
  @IsString({})
  bname2: string;
  @IsString({})
  jibunAddress: string;
}
