import { Module } from '@nestjs/common';
import { IncomeExpendService } from './income-expend.service';
import { IncomeExpendController } from './income-expend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeExpend } from './entities/income-expend.entity';
import { Company } from 'src/company/entities/company.entity';
import { CompanyService } from 'src/company/company.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { CompanyAsset } from 'src/company-assets/entities/company-asset.entity';
import { CompanyAssetsService } from 'src/company-assets/company-assets.service';
import { TokenService } from 'src/auth/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IncomeExpend, Company, User, CompanyAsset]),
  ],
  controllers: [IncomeExpendController],
  providers: [
    IncomeExpendService,
    CompanyService,
    UserService,
    CompanyAssetsService,
    TokenService,
  ],
  exports: [IncomeExpendService],
})
export class IncomeExpendModule {}
