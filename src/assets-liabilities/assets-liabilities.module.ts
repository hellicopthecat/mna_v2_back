import { Module } from '@nestjs/common';
import { AssetsLiabilitiesService } from './assets-liabilities.service';
import { AssetsLiabilitiesController } from './assets-liabilities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsLiability } from './entities/assets-liability.entity';
import { Company } from 'src/company/entities/company.entity';
import { CompanyAsset } from 'src/company-assets/entities/company-asset.entity';
import { CompanyAssetsService } from 'src/company-assets/company-assets.service';
import { CompanyService } from 'src/company/company.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { TokenService } from 'src/auth/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyAsset, AssetsLiability, Company, User]),
  ],
  controllers: [AssetsLiabilitiesController],
  providers: [
    AssetsLiabilitiesService,
    CompanyAssetsService,
    CompanyService,
    UserService,
    TokenService,
  ],
})
export class AssetsLiabilitiesModule {}
