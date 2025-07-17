import { Injectable, NotFoundException } from '@nestjs/common';
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
      current: createAssetsLiabilityDto.current === 'on' ? true : false,
      assetOrLiability:
        createAssetsLiabilityDto.assetOrLiability === 'on' ? true : false,
      companyAsset,
    });
    await this.assetsLiabilityRepo.save(newAssets);

    return { msg: true };
  }

  async findOne(asssetId: number) {
    const asset = await this.assetsLiabilityRepo.findOneBy({ id: asssetId });
    if (!asset) {
      throw new NotFoundException('자산을 찾을 수 없습니다.');
    }
    return asset;
  }
  async findTotalAsset(assetId: number) {
    const totalAsset = await this.assetsLiabilityRepo
      .createQueryBuilder('asset')
      .where('asset.companyAsset.id = :id', { id: assetId })
      .skip(0)
      .take(5)
      .orderBy('id', 'DESC')
      .getMany();
    return totalAsset;
  }

  async update(
    assetId: number,
    updateAssetsLiabilityDto: UpdateAssetsLiabilityDto,
  ) {
    await this.assetsLiabilityRepo.update(
      { id: assetId },
      {
        ...updateAssetsLiabilityDto,
        current: updateAssetsLiabilityDto.current === 'on' ? true : false,
        assetOrLiability:
          updateAssetsLiabilityDto.assetOrLiability === 'on' ? true : false,
      },
    );
    return { msg: '자산이 업데이트 되었습니다.' };
  }

  async remove(assetId: number) {
    const asset = await this.findOne(assetId);
    if (!asset) {
      throw new NotFoundException('자산을 찾을 수 없습니다.');
    }
    await this.assetsLiabilityRepo.delete({ id: asset.id });
    return { msg: '자산이 삭제되었습니다.' };
  }
}
