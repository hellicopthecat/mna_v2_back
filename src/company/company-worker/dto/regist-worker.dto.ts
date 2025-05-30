import { IsString } from 'class-validator';

export class RegistWorkerDto {
  @IsString()
  companyId: string;
  @IsString()
  workerId: string;
}
