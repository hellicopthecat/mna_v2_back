import { Module } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Salary } from './entities/salary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Salary])],
  controllers: [SalaryController],
  providers: [SalaryService],
})
export class SalaryModule {}
