import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VacationService } from './vacation.service';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';

@Controller('vacation')
export class VacationController {
  constructor(private readonly vacationService: VacationService) {}

  @Post()
  createVacation(
    @Param('userId') userId: string,
    @Body() createVacationDto: CreateVacationDto,
  ) {
    return this.vacationService.createVacation(
      Number(userId),
      createVacationDto,
    );
  }

  @Get()
  findAllVacation() {
    return this.vacationService.findAllVacation();
  }

  @Get(':id')
  findOneVacation(@Param('id') id: string) {
    return this.vacationService.findOneVacation(+id);
  }

  @Patch(':vacationId')
  updateVacation(
    @Param('vacationId') vacationId: string,
    @Body() updateVacationDto: UpdateVacationDto,
  ) {
    return this.vacationService.updateVacation(
      Number(vacationId),
      updateVacationDto,
    );
  }

  @Delete(':id')
  removeVacation(@Param('id') id: string) {
    return this.vacationService.removeVacation(+id);
  }
}
