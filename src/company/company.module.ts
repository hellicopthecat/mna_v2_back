import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CompanyWorkerService } from './company-worker/company-worker.service';
import { CompanyManagerService } from './company-manager/company-manager.service';
import { CompanyWorkerController } from './company-worker/company-worker.controller';
import { CompanyMangerController } from './company-manager/company-manger.controller';
import { CompanyConnectController } from './company-connect/company-connect.controller';
import { CompanyConnectService } from './company-connect/company-connect.service';
import { Product } from 'src/product/entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TokenService } from 'src/auth/token.service';
import { CompanyWorkerSalaryController } from './company-worker/company-workers-salary/company-workers-salary.controller';
import { CompanyWorkerSalaryService } from './company-worker/company-workers-salary/company-workers-salary.service';
import { Salary } from 'src/salary/entities/salary.entity';
import { CompanyWorkersVacationService } from './company-worker/company-workers-vacation/company-workers-vacation.service';
import { CompanyWorkersVacationController } from './company-worker/company-workers-vacation/company-workers-vacation.controller';
import { Vacation } from 'src/vacation/entities/vacation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, User, Product, Salary, Vacation]),
    AuthModule,
  ],
  controllers: [
    CompanyController,
    CompanyWorkerController,
    CompanyMangerController,
    CompanyConnectController,
    CompanyWorkerSalaryController,
    CompanyWorkersVacationController,
  ],
  providers: [
    UserService,
    TokenService,
    CompanyService,
    CompanyManagerService,
    CompanyWorkerService,
    CompanyConnectService,
    CompanyWorkerSalaryService,
    CompanyWorkersVacationService,
  ],
  exports: [CompanyService],
})
export class CompanyModule {}
