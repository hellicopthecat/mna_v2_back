import { PartialType } from '@nestjs/mapped-types';
import { CreateVacationDescDto } from './create-vacation-desc.dto';

export class UpdateVacationDescDto extends PartialType(CreateVacationDescDto) {}
