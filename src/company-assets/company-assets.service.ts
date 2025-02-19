import { Injectable } from '@nestjs/common';
import { CreateCompanyAssetDto } from './dto/create-company-asset.dto';
import { UpdateCompanyAssetDto } from './dto/update-company-asset.dto';

@Injectable()
export class CompanyAssetsService {
  create(createCompanyAssetDto: CreateCompanyAssetDto) {
    return 'This action adds a new companyAsset';
  }

  findAll() {
    return `This action returns all companyAssets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyAsset`;
  }

  update(id: number, updateCompanyAssetDto: UpdateCompanyAssetDto) {
    return `This action updates a #${id} companyAsset`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyAsset`;
  }
}
