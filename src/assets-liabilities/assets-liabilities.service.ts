import { Injectable } from '@nestjs/common';
import { CreateAssetsLiabilityDto } from './dto/create-assets-liability.dto';
import { UpdateAssetsLiabilityDto } from './dto/update-assets-liability.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetsLiability } from './entities/assets-liability.entity';
import { Repository } from 'typeorm';
import { CompanyAsset } from 'src/company-assets/entities/company-asset.entity';
import { CompanyAssetsService } from 'src/company-assets/company-assets.service';

@Injectable()
export class AssetsLiabilitiesService {
  constructor(
    @InjectRepository(AssetsLiability)
    private assetsLiabilityRepo: Repository<AssetsLiability>,
    @InjectRepository(CompanyAsset)
    private companyAssetRepo: Repository<CompanyAsset>,
    private readonly companyAssetService: CompanyAssetsService,
  ) {}
  async create(
    companyAssetId: number,
    createAssetsLiabilityDto: CreateAssetsLiabilityDto,
  ) {
    const companyAsset =
      await this.companyAssetService.findCompanyAsset(companyAssetId);
    const newAssets = this.assetsLiabilityRepo.create({
      ...createAssetsLiabilityDto,
      companyAsset,
    });
    await this.assetsLiabilityRepo.save(newAssets);

    return { msg: '자산이 생성되었습니다.' };
  }

  async findOne(asssetId: number) {
    return this.assetsLiabilityRepo.findOneBy({ id: asssetId });
  }

  async update(
    assetId: number,
    updateAssetsLiabilityDto: UpdateAssetsLiabilityDto,
  ) {
    await this.assetsLiabilityRepo.update(
      { id: assetId },
      updateAssetsLiabilityDto,
    );
    return { msg: '자산이 업데이트 되었습니다.' };
  }

  async remove(assetId: number) {
    await this.assetsLiabilityRepo.delete({ id: assetId });
    return { msg: '자산이 삭제되었습니다.' };
  }
}
