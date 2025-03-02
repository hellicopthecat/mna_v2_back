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
import { EquityLiabilitiesModule } from './equity-liabilities/equity-liabilities.module';
import { CompanyAssetsModule } from './company-assets/company-assets.module';
import { AuthModule } from './auth/auth.module';
import { Company } from './company/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      entities: [User, Company, Salary],
      database: 'db.db',
      synchronize: true,
    }),
    UserModule,
    SalaryModule,
    CompanyModule,
    VacationModule,
    ProductModule,
    IncomeExpendModule,
    EquityLiabilitiesModule,
    CompanyAssetsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
