import { IsNumber } from 'class-validator';

export class CreateSalaryDto {
  @IsNumber()
  preTaxMonthlySalary: number;
  @IsNumber()
  familyCount: number;
  @IsNumber()
  childCount: number;
}
