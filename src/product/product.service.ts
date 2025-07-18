import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CompanyService } from 'src/company/company.service';
import { IncomeExpend } from 'src/income-expend/entities/income-expend.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(IncomeExpend)
    private incomeExpendRepo: Repository<IncomeExpend>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private readonly companyService: CompanyService,
  ) {}
  async createProduct(companyId: number, createProductDto: CreateProductDto) {
    const company = await this.companyService.findOneCompany(companyId);
    const incomeExpend = this.incomeExpendRepo.create({
      incomeTrue: createProductDto.incomeTrue === 'income' ? true : false,
      title: createProductDto.transactionTitle,
      cost:
        Number(
          createProductDto.itemCount === '0' ? 1 : createProductDto.itemCount,
        ) *
        Number(
          createProductDto.itemPrice === '0' ? 1 : createProductDto.itemPrice,
        ),
      businessDate: new Date().toString(),
      businessDesc: createProductDto.itemDesc,
      paymentType: createProductDto.paymentType,
      paymentsDone: createProductDto.paymentsDone,
      companyAsset: company.companyAssets,
    });
    await this.incomeExpendRepo.save(incomeExpend);

    const product = this.productRepo.create({
      transactionTitle: createProductDto.transactionTitle,
      itemName: createProductDto.itemName,
      itemModelName: createProductDto.itemModelName,
      itemPhoto: createProductDto.itemPhoto,
      itemType: createProductDto.itemType,
      itemCount: Number(createProductDto.itemCount),
      itemPrice: Number(createProductDto.itemPrice),
      itemDesc: createProductDto.itemDesc,
      company,
      incomeExpend,
    });

    return await this.productRepo.save(product);
  }

  async findOneProduct(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['incomeExpend'],
    });
    if (!product) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }
    return product;
  }
  async findTotalProduct(id: number) {
    const products = await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.company', 'company')
      .leftJoinAndSelect('product.incomeExpend', 'incomeExpend')
      .where('product.company.id = :id', { id })
      .skip(0)
      .take(5)
      .orderBy('product.id', 'DESC')
      .getMany();
    return products;
  }

  async updateProduct(productId: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }
    await this.productRepo.update(
      { id: product.id },
      {
        transactionTitle: updateProductDto.transactionTitle,
        itemName: updateProductDto.itemName,
        itemModelName: updateProductDto.itemModelName,
        itemPhoto: updateProductDto.itemPhoto,
        itemType: updateProductDto.itemType,
        itemDesc: updateProductDto.itemDesc,
        itemPrice: Number(
          updateProductDto.itemPrice === '0' ? 1 : updateProductDto.itemPrice,
        ),
        itemCount: Number(
          updateProductDto.itemCount === '0' ? 1 : updateProductDto.itemCount,
        ),
      },
    );
    await this.incomeExpendRepo.update(
      { id: product.incomeExpend.id },
      {
        cost:
          Number(
            updateProductDto.itemPrice === '0' ? 1 : updateProductDto.itemPrice,
          ) *
          Number(
            updateProductDto.itemCount === '0' ? 1 : updateProductDto.itemCount,
          ),
        paymentType: updateProductDto.paymentType,
        incomeTrue: updateProductDto.incomeTrue === 'income' ? true : false,
        paymentsDone: updateProductDto.paymentsDone,
      },
    );
    return { msg: '상품 업데이트가 완료되었습니다.' };
  }

  async removeProduct(productId: number) {
    await this.productRepo.delete({ id: productId });
    return { msg: '상품이 삭제되었습니다.' };
  }
}
