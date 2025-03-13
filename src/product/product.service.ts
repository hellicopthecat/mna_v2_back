import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities/company.entity';
import { IncomeExpend } from 'src/income-expend/entities/income-expend.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
    @InjectRepository(IncomeExpend)
    private incomeExpendRepo: Repository<IncomeExpend>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private readonly companyService: CompanyService,
  ) {}
  async createProduct(companyId: number, createProductDto: CreateProductDto) {
    const company = await this.companyService.findOneCompany(companyId);
    const incomeExpend = this.incomeExpendRepo.create({
      incomeTrue: createProductDto.incomeTure,
      title: createProductDto.transactionTitle,
      cost: createProductDto.itemCount * createProductDto.itemPrice,
      businessDate: new Date().toDateString(),
      businessDesc: createProductDto.itemDesc,
      paymentType: createProductDto.paymentType,
      paymentsDone: createProductDto.paymentsDone,
    });
    company.companyAssets.allIncomeExpend.push(incomeExpend);
    const product = this.productRepo.create(createProductDto);
    product.company = company;
    product.incomeExpend = incomeExpend;
    await this.productRepo.save(product);
    company.companyProduct.push(product);
    await this.companyRepo.save(company);

    return 'This action adds a new product';
  }

  async findOneProduct(id: number) {
    return await this.productRepo.findOneBy({ id });
  }

  async updateProduct(
    incomeExpendId: number,
    updateProductDto: UpdateProductDto,
  ) {
    await this.productRepo.update({ id: incomeExpendId }, updateProductDto);
    return { msg: '상품 업데이트가 완료되었습니다.' };
  }

  removeProduct(incomeExpendId: number) {
    return this.incomeExpendRepo.delete({ id: incomeExpendId });
  }
}
