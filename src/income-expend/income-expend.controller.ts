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
import { IncomeExpendService } from './income-expend.service';
import { CreateIncomeExpendDto } from './dto/create-income-expend.dto';
import { UpdateIncomeExpendDto } from './dto/update-income-expend.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ManagerGuard } from 'src/guards/manager/manager.guard';

@Controller('income-expend')
@UseGuards(AuthGuard)
@UseGuards(ManagerGuard)
export class IncomeExpendController {
  constructor(private readonly incomeExpendService: IncomeExpendService) {}

  @Post(':companyAssetId')
  create(
    @Param('companyAssetId') companyAssetId: string,
    @Body() createIncomeExpendDto: CreateIncomeExpendDto,
  ) {
    return this.incomeExpendService.createInEx(
      Number(companyAssetId),
      createIncomeExpendDto,
    );
  }

  @Get(':companyAssetId')
  findOneInEx(@Param('companyAssetId') companyAssetId: string) {
    return this.incomeExpendService.findOneInEx(Number(companyAssetId));
  }

  @Patch(':companyAssetId')
  update(
    @Param('companyAssetId') companyAssetId: string,
    @Body() updateIncomeExpendDto: UpdateIncomeExpendDto,
  ) {
    return this.incomeExpendService.updateInEx(
      Number(companyAssetId),
      updateIncomeExpendDto,
    );
  }

  @Delete(':companyAssetId')
  remove(@Param('companyAssetId') companyAssetId: string) {
    return this.incomeExpendService.removeInEx(Number(companyAssetId));
  }
}
