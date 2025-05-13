import { IsString } from 'class-validator';

export class ConnectCompanyDto {
  @IsString()
  myCompanyId: string;
  @IsString()
  targetCompanyId: string;
}
