import { IsEnum, IsNumber, IsString } from 'class-validator';
import { TVacation } from '../entities/vacation-desc.entity';

export class CreateVacationDescDto {
  @IsEnum({ type: 'enum', enum: TVacation })
  vacationType: TVacation;
  @IsNumber()
  day: number;
  @IsString()
  description: string;
}
