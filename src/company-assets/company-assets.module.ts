import { Module } from '@nestjs/common';
import { CompanyAssetsService } from './company-assets.service';
import { CompanyAssetsController } from './company-assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyAsset } from './entities/company-asset.entity';
import { Company } from 'src/company/entities/company.entity';
import { User } from 'src/user/entities/user.entity';
import { CompanyService } from 'src/company/company.service';
import { UserService } from 'src/user/user.service';
import { AssetsLiability } from 'src/assets-liabilities/entities/assets-liability.entity';
import { IncomeExpendService } from 'src/income-expend/income-expend.service';
import { IncomeExpend } from 'src/income-expend/entities/income-expend.entity';
import { TokenService } from 'src/auth/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyAsset,
      AssetsLiability,
      IncomeExpend,
      Company,
      User,
    ]),
  ],
  controllers: [CompanyAssetsController],
  providers: [
    CompanyAssetsService,
    CompanyService,
    UserService,
    IncomeExpendService,
    TokenService,
  ],
  exports: [CompanyAssetsService],
})
export class CompanyAssetsModule {}
