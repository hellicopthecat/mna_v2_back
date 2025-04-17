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

  @Post(':assetId')
  create(
    @Param('assetId') assetId: string,
    @Body() createIncomeExpendDto: CreateIncomeExpendDto,
  ) {
    return this.incomeExpendService.createInEx(
      Number(assetId),
      createIncomeExpendDto,
    );
  }

  @Get(':assetId')
  findOneInEx(@Param('assetId') assetId: string) {
    return this.incomeExpendService.findOneInEx(Number(assetId));
  }
  @Get('totalInEx/:assetId')
  async findTotalInEx(@Param('assetId') assetId: string) {
    return this.incomeExpendService.findTotalInEx(Number(assetId));
  }

  @Patch(':assetId')
  update(
    @Param('assetId') assetId: string,
    @Body() updateIncomeExpendDto: UpdateIncomeExpendDto,
  ) {
    return this.incomeExpendService.updateInEx(
      Number(assetId),
      updateIncomeExpendDto,
    );
  }

  @Delete(':assetId')
  remove(@Param('assetId') assetId: string) {
    return this.incomeExpendService.removeInEx(Number(assetId));
  }
}
