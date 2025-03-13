import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VacationDescService } from './vacation-desc.service';
import { CreateVacationDescDto } from './dto/create-vacation-desc.dto';
import { UpdateVacationDescDto } from './dto/update-vacation-desc.dto';

@Controller('vacation-desc')
export class VacationDescController {
  constructor(private readonly vacationDescService: VacationDescService) {}

  @Post()
  createVacationDesc(
    @Param('vacationId') vacationId: string,
    @Body() createVacationDescDto: CreateVacationDescDto,
  ) {
    return this.vacationDescService.createVacationDesc(
      Number(vacationId),
      createVacationDescDto,
    );
  }

  @Get(':id')
  findOneVacationDesc(@Param('id') id: string) {
    return this.vacationDescService.findOneVacationDesc(+id);
  }

  @Patch(':id')
  updateVacationDesc(
    @Param('id') id: string,
    @Body() updateVacationDescDto: UpdateVacationDescDto,
  ) {
    return this.vacationDescService.updateVacationDesc(
      +id,
      updateVacationDescDto,
    );
  }

  @Delete(':vacationId')
  removeVacationDesc(
    @Param('vacationId') vacationId: string,
    @Param('vacationDescId') vacationDescId: string,
  ) {
    return this.vacationDescService.removeVacationDesc(
      Number(vacationId),
      Number(vacationDescId),
    );
  }
}
