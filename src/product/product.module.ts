import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Company } from 'src/company/entities/company.entity';
import { IncomeExpend } from 'src/income-expend/entities/income-expend.entity';
import { IncomeExpendService } from 'src/income-expend/income-expend.service';
import { CompanyAsset } from 'src/company-assets/entities/company-asset.entity';
import { CompanyService } from 'src/company/company.service';
import { CompanyAssetsService } from 'src/company-assets/company-assets.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { TokenService } from 'src/auth/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Company,
      IncomeExpend,
      CompanyAsset,
      User,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    IncomeExpendService,
    CompanyService,
    CompanyAssetsService,
    UserService,
    TokenService,
  ],
})
export class ProductModule {}
