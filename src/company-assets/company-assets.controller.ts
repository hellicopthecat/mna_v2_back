import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyAssetsService } from './company-assets.service';
import { CreateCompanyAssetDto } from './dto/create-company-asset.dto';
import { UpdateCompanyAssetDto } from './dto/update-company-asset.dto';

@Controller('company-assets')
export class CompanyAssetsController {
  constructor(private readonly companyAssetsService: CompanyAssetsService) {}

  @Post()
  create(@Body() createCompanyAssetDto: CreateCompanyAssetDto) {
    return this.companyAssetsService.create(createCompanyAssetDto);
  }

  @Get()
  findAll() {
    return this.companyAssetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyAssetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyAssetDto: UpdateCompanyAssetDto) {
    return this.companyAssetsService.update(+id, updateCompanyAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyAssetsService.remove(+id);
  }
}
