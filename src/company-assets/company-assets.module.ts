import { Module } from '@nestjs/common';
import { CompanyAssetsService } from './company-assets.service';
import { CompanyAssetsController } from './company-assets.controller';

@Module({
  controllers: [CompanyAssetsController],
  providers: [CompanyAssetsService],
})
export class CompanyAssetsModule {}
