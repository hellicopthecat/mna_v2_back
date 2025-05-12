import { Module } from '@nestjs/common';
import { VacationDescService } from './vacation-desc.service';
import { VacationDescController } from './vacation-desc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacationDesc } from './entities/vacation-desc.entity';
import { VacationService } from 'src/vacation/vacation.service';
import { Vacation } from 'src/vacation/entities/vacation.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities/company.entity';
import { TokenService } from 'src/auth/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([VacationDesc, Vacation, User, Company])],
  controllers: [VacationDescController],
  providers: [
    VacationDescService,
    VacationService,
    UserService,
    CompanyService,
    TokenService,
  ],
})
export class VacationDescModule {}
