import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIncomeExpendDto } from './dto/create-income-expend.dto';
import { UpdateIncomeExpendDto } from './dto/update-income-expend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncomeExpend } from './entities/income-expend.entity';
import { CompanyAssetsService } from 'src/company-assets/company-assets.service';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class IncomeExpendService {
  constructor(
    @InjectRepository(IncomeExpend)
    private incomeExpendRepo: Repository<IncomeExpend>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private readonly companyAssetService: CompanyAssetsService,
  ) {}
  async createInEx(
    companyAssetId: number,
    createIncomeExpendDto: CreateIncomeExpendDto,
  ) {
    const companyAsset =
      await this.companyAssetService.findCompanyAsset(companyAssetId);
    const incomeExpend = this.incomeExpendRepo.create({
      ...createIncomeExpendDto,
      cost: Number(createIncomeExpendDto.cost),
      incomeTrue: createIncomeExpendDto.incomeTrue === 'on' ? true : false,
      companyAsset,
    });
    await this.incomeExpendRepo.save(incomeExpend);
    return { msg: '수입지출서를 작성했습니다.' };
  }

  async findOneInEx(inexId: number) {
    const inex = await this.incomeExpendRepo.findOne({
      where: { id: inexId },
      relations: { product: true },
    });
    if (!inex) {
      throw new NotFoundException('수입지출서를 찾을 수 없습니다.');
    }
    return inex;
  }
  async findTotalInEx(assetId: number) {
    const data = await this.incomeExpendRepo
      .createQueryBuilder('inex')
      .leftJoinAndSelect('inex.companyAsset', 'companyAsset')
      .where('inex.companyAsset.id = :id', { id: assetId })
      .skip(0)
      .take(5)
      .orderBy('inex.companyAsset.id', 'DESC')
      .getMany();
    return data;
  }

  async updateInEx(ieId: number, updateIncomeExpendDto: UpdateIncomeExpendDto) {
    await this.incomeExpendRepo.update(
      { id: ieId },
      {
        ...updateIncomeExpendDto,
        cost: Number(updateIncomeExpendDto.cost),
        incomeTrue: updateIncomeExpendDto.incomeTrue === 'on' ? true : false,
      },
    );
    return { msg: '수입지출데이터가 수정되었습니다.' };
  }

  async removeInEx(ieId: number) {
    const inex = await this.findOneInEx(ieId);
    if (inex.product) {
      await this.productRepo.delete({ id: inex.product.id });
    }
    await this.incomeExpendRepo.delete({ id: inex.id });
    return { msg: '수입지술서가 삭제되었습니다.' };
  }
}
