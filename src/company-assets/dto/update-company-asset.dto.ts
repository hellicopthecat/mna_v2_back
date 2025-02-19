import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyAssetDto } from './create-company-asset.dto';

export class UpdateCompanyAssetDto extends PartialType(CreateCompanyAssetDto) {}
