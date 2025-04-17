import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { SalaryModule } from './salary/salary.module';
import { Salary } from './salary/entities/salary.entity';
import { CompanyModule } from './company/company.module';
import { VacationModule } from './vacation/vacation.module';
import { ProductModule } from './product/product.module';
import { IncomeExpendModule } from './income-expend/income-expend.module';
import { CompanyAssetsModule } from './company-assets/company-assets.module';
import { AuthModule } from './auth/auth.module';
import { Company } from './company/entities/company.entity';
import { AssetsLiabilitiesModule } from './assets-liabilities/assets-liabilities.module';
import { CompanyAsset } from './company-assets/entities/company-asset.entity';
import { AssetsLiability } from './assets-liabilities/entities/assets-liability.entity';
import { IncomeExpend } from './income-expend/entities/income-expend.entity';
import { Vacation } from './vacation/entities/vacation.entity';
import { Product } from './product/entities/product.entity';
import { VacationDescModule } from './vacation-desc/vacation-desc.module';
import { VacationDesc } from './vacation-desc/entities/vacation-desc.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      entities: [
        User,
        Company,
        CompanyAsset,
        AssetsLiability,
        IncomeExpend,
        Product,
        Salary,
        Vacation,
        VacationDesc,
      ],
      database: 'db.db',
      synchronize: true,
    }),
    UserModule,
    SalaryModule,
    CompanyModule,
    VacationModule,
    ProductModule,
    IncomeExpendModule,
    CompanyAssetsModule,
    AuthModule,
    AssetsLiabilitiesModule,
    VacationDescModule,
    ConfigModule.forRoot({ envFilePath: ['.env.development.local'] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
