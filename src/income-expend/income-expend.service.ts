import { Injectable } from '@nestjs/common';
import { CreateIncomeExpendDto } from './dto/create-income-expend.dto';
import { UpdateIncomeExpendDto } from './dto/update-income-expend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncomeExpend } from './entities/income-expend.entity';
import { CompanyAssetsService } from 'src/company-assets/company-assets.service';

@Injectable()
export class IncomeExpendService {
  constructor(
    @InjectRepository(IncomeExpend)
    private incomeExpendRepo: Repository<IncomeExpend>,

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
      companyAsset,
    });
    await this.incomeExpendRepo.save(incomeExpend);
    return { msg: '수입지출서를 작성했습니다.' };
  }

  async findOneInEx(companyId: number) {
    return await this.incomeExpendRepo.findOneBy({ id: companyId });
  }

  async updateInEx(ieId: number, updateIncomeExpendDto: UpdateIncomeExpendDto) {
    await this.incomeExpendRepo.update({ id: ieId }, updateIncomeExpendDto);
    return { msg: '수입지출데이터가 수정되었습니다.' };
  }

  async removeInEx(ieId: number) {
    await this.findOneInEx(ieId);
    await this.incomeExpendRepo.delete({ id: ieId });
    return { msg: '수입지술서가 삭제되었습니다.' };
  }
}
