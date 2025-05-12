import { IsString } from 'class-validator';

export class CreateSalaryDto {
  @IsString()
  preTaxMonthlySalary: string;
  @IsString()
  familyCount: string;
  @IsString()
  childCount: string;
}
