import { Module } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { VacationController } from './vacation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacation } from './entities/vacation.entity';
import { User } from 'src/user/entities/user.entity';
import { VacationDesc } from 'src/vacation-desc/entities/vacation-desc.entity';
import { UserService } from 'src/user/user.service';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities/company.entity';
import { TokenService } from 'src/auth/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vacation, VacationDesc, User, Company])],
  controllers: [VacationController],
  providers: [VacationService, UserService, CompanyService, TokenService],
})
export class VacationModule {}
