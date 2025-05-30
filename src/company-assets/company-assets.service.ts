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
    return { companyId: company.id };
  }

  async findCompanyAsset(assetId: number) {
    const companyAsset = await this.companyAssetRepo.findOne({
      where: {
        id: assetId,
      },
      relations: { totalAssetsDesc: true, allIncomeExpend: true },
    });
    if (!companyAsset) {
      throw new NotFoundException('자산정보를 생성하세요.');
    }
    return companyAsset;
  }

  async updateCompanyAsset(
    assetId: number,
    updateCompanyAssetDto: UpdateCompanyAssetDto,
  ) {
    await this.companyAssetRepo.update({ id: assetId }, updateCompanyAssetDto);
    return { msg: '자산정보가 수정되었습니다.' };
  }

  async removeCompanyAsset(companyAssetId: number) {
    await this.findCompanyAsset(companyAssetId);
    await this.companyAssetRepo.delete({ id: companyAssetId });
    return { msg: '자산정보서비스가 삭제되었습니다.' };
  }
}
