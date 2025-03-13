import { IsNumber, IsString } from 'class-validator';

export class CreateVacationDto {
  @IsString()
  joinCompanyDate: string;
  @IsNumber()
  other: number;
}
