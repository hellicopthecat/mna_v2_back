import { IsString } from 'class-validator';

export class CreateVacationDto {
  @IsString()
  joinCompanyDate: string;
  @IsString()
  other: string;
}
