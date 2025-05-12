import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VacationService } from './vacation.service';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ManagerGuard } from 'src/guards/manager/manager.guard';

@Controller('vacation')
@UseGuards(AuthGuard)
@UseGuards(ManagerGuard)
export class VacationController {
  constructor(private readonly vacationService: VacationService) {}

  @Post(':companyId/:targetUserId')
  createVacation(
    @Param('companyId') companyId: string,
    @Param('targetUserId') targetUserId: string,
    @Body() createVacationDto: CreateVacationDto,
  ) {
    return this.vacationService.createVacation(
      Number(companyId),
      Number(targetUserId),
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

  @Post(':vacationId')
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
