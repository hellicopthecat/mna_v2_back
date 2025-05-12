import { IsString } from 'class-validator';

export class AddManagerDto {
  @IsString()
  companyId: string;
  @IsString()
  workerId: string;
}
