import { Module } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { VacationController } from './vacation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacation } from './entities/vacation.entity';
import { User } from 'src/user/entities/user.entity';
import { VacationDesc } from 'src/vacation-desc/entities/vacation-desc.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vacation, VacationDesc, User])],
  controllers: [VacationController],
  providers: [VacationService, UserService],
})
export class VacationModule {}
