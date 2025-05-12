import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Salary } from 'src/salary/entities/salary.entity';
import { Company } from 'src/company/entities/company.entity';
import { TokenService } from 'src/auth/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Salary])],
  controllers: [UserController],
  providers: [UserService, TokenService],
  exports: [UserService],
})
export class UserModule {}
