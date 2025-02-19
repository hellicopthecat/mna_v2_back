import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquityLiabilitiesService } from './equity-liabilities.service';
import { CreateEquityLiabilityDto } from './dto/create-equity-liability.dto';
import { UpdateEquityLiabilityDto } from './dto/update-equity-liability.dto';

@Controller('equity-liabilities')
export class EquityLiabilitiesController {
  constructor(private readonly equityLiabilitiesService: EquityLiabilitiesService) {}

  @Post()
  create(@Body() createEquityLiabilityDto: CreateEquityLiabilityDto) {
    return this.equityLiabilitiesService.create(createEquityLiabilityDto);
  }

  @Get()
  findAll() {
    return this.equityLiabilitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equityLiabilitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquityLiabilityDto: UpdateEquityLiabilityDto) {
    return this.equityLiabilitiesService.update(+id, updateEquityLiabilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equityLiabilitiesService.remove(+id);
  }
}
