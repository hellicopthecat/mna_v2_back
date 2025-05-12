import { Module } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Salary } from './entities/salary.entity';
import { UserService } from 'src/user/user.service';
import { Company } from 'src/company/entities/company.entity';
import { CompanyService } from 'src/company/company.service';
import { TokenService } from 'src/auth/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Salary, Company])],
  controllers: [SalaryController],
  providers: [SalaryService, UserService, CompanyService, TokenService],
})
export class SalaryModule {}
