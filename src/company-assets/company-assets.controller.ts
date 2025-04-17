import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompanyAssetsService } from './company-assets.service';
import { CreateCompanyAssetDto } from './dto/create-company-asset.dto';
import { UpdateCompanyAssetDto } from './dto/update-company-asset.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ManagerGuard } from 'src/guards/manager/manager.guard';

@Controller('company-assets')
@UseGuards(AuthGuard)
@UseGuards(ManagerGuard)
export class CompanyAssetsController {
  constructor(private readonly companyAssetsService: CompanyAssetsService) {}

  @Post(':companyId')
  createCompanyAsset(
    @Param('companyId') companyId: string,
    @Body() createCompanyAssetDto: CreateCompanyAssetDto,
  ) {
    return this.companyAssetsService.createCompanyAsset(
      Number(companyId),
      createCompanyAssetDto,
    );
  }

  @Get(':companyId')
  findCompanyAsset(@Param('companyId') companyId: string) {
    return this.companyAssetsService.findCompanyAsset(Number(companyId));
  }

  @Patch(':companyId/:assetId')
  updateCompanyAsset(
    @Param('assetId') assetId: string,
    @Body() updateCompanyAssetDto: UpdateCompanyAssetDto,
  ) {
    return this.companyAssetsService.updateCompanyAsset(
      Number(assetId),
      updateCompanyAssetDto,
    );
  }

  @Delete(':companyAssetId')
  removeCompanyAsset(@Param('companyAssetId') companyAssetId: string) {
    return this.companyAssetsService.removeCompanyAsset(Number(companyAssetId));
  }
}
