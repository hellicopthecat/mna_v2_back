import { PartialType } from '@nestjs/mapped-types';
import { CreateAssetsLiabilityDto } from './create-assets-liability.dto';

export class UpdateAssetsLiabilityDto extends PartialType(CreateAssetsLiabilityDto) {}
