import { Module } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { VacationController } from './vacation.controller';

@Module({
  controllers: [VacationController],
  providers: [VacationService],
})
export class VacationModule {}
