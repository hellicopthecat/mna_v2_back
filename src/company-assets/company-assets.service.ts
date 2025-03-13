import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyAssetDto } from './dto/create-company-asset.dto';
import { UpdateCompanyAssetDto } from './dto/update-company-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyAsset } from './entities/company-asset.entity';
import { Repository } from 'typeorm';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class CompanyAssetsService {
  constructor(
    @InjectRepository(CompanyAsset)
    private companyAssetRepo: Repository<CompanyAsset>,
    private readonly companyService: CompanyService,
  ) {}

  async createCompanyAsset(
    companyId: number,
    createCompanyAssetDto: CreateCompanyAssetDto,
  ) {
    const company = await this.companyService.findOneCompany(companyId);
    const companyAsset = this.companyAssetRepo.create({
      ...createCompanyAssetDto,
      company,
    });
    await this.companyAssetRepo.save(companyAsset);
    return { msg: '자산정보서비스가 생성되었습니다.' };
  }
  async findOneCompanyAsset(companyAssetId: number) {
    const companyAsset = await this.companyAssetRepo.findOneBy({
      id: companyAssetId,
    });
    if (!companyAsset) {
      throw new NotFoundException('회사자산정보를 생성하세요.');
    }
    return companyAsset;
  }
  async findCompanyAsset(companyId: number) {
    const companyAssets = await this.companyAssetRepo.findOneBy({
      id: companyId,
    });
    if (!companyAssets) {
      throw new NotFoundException('자산정보를 생성하세요.');
    }
    return companyAssets;
  }

  async updateCompanyAsset(
    assetId: number,
    updateCompanyAssetDto: UpdateCompanyAssetDto,
  ) {
    await this.companyAssetRepo.update({ id: assetId }, updateCompanyAssetDto);
    return { msg: '자산정보가 수정되었습니다.' };
  }

  async removeCompanyAsset(companyAssetId: number) {
    await this.findOneCompanyAsset(companyAssetId);
    await this.companyAssetRepo.delete({ id: companyAssetId });
    return { msg: '자산정보서비스가 삭제되었습니다.' };
  }
}
