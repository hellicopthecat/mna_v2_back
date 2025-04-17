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
import { AssetsLiabilitiesService } from './assets-liabilities.service';
import { CreateAssetsLiabilityDto } from './dto/create-assets-liability.dto';
import { UpdateAssetsLiabilityDto } from './dto/update-assets-liability.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ManagerGuard } from 'src/guards/manager/manager.guard';

@Controller('assets-liabilities')
@UseGuards(AuthGuard)
@UseGuards(ManagerGuard)
export class AssetsLiabilitiesController {
  constructor(
    private readonly assetsLiabilitiesService: AssetsLiabilitiesService,
  ) {}

  @Post(':assetId')
  create(
    @Param('assetId') companyAssetId: string,
    @Body() createAssetsLiabilityDto: CreateAssetsLiabilityDto,
  ) {
    return this.assetsLiabilitiesService.create(
      Number(companyAssetId),
      createAssetsLiabilityDto,
    );
  }

  @Get(':assetId')
  findOne(@Param('assetId') assetId: string) {
    return this.assetsLiabilitiesService.findOne(Number(assetId));
  }

  @Get('totalAsset/:assetId')
  findTotalAsset(@Param('assetId') assetId: string) {
    return this.assetsLiabilitiesService.findTotalAsset(Number(assetId));
  }

  @Patch(':assetId')
  update(
    @Param('assetId') assetId: string,
    @Body() updateAssetsLiabilityDto: UpdateAssetsLiabilityDto,
  ) {
    return this.assetsLiabilitiesService.update(
      Number(assetId),
      updateAssetsLiabilityDto,
    );
  }

  @Delete(':assetId')
  remove(@Param('assetId') assetId: string) {
    return this.assetsLiabilitiesService.remove(Number(assetId));
  }
}
