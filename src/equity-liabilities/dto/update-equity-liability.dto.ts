import { PartialType } from '@nestjs/mapped-types';
import { CreateEquityLiabilityDto } from './create-equity-liability.dto';

export class UpdateEquityLiabilityDto extends PartialType(CreateEquityLiabilityDto) {}
