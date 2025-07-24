import { Expose, Type } from 'class-transformer';
import { CompanyDto } from 'src/company/dto/company.dto';
import { SalaryDto } from 'src/salary/dto/salary.dto';
import { Salary } from 'src/salary/entities/salary.entity';
import { VacationDto } from 'src/vacation/dto/vacation.dto';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  createdAt: Date;
  @Expose()
  updateAt: Date;
  @Expose()
  email: string;
  @Expose()
  userName: string;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  phone: string;
  @Expose()
  avatarUrl: string;
  @Expose()
  @Type(() => CompanyDto)
  ownedCompany: CompanyDto[];
  @Expose()
  @Type(() => CompanyDto)
  managedCompany: CompanyDto[];
  @Expose()
  @Type(() => CompanyDto)
  workAtCompany: CompanyDto[];
  @Expose()
  @Type(() => SalaryDto)
  salary: Salary[];
  @Expose()
  @Type(() => VacationDto)
  vacation: VacationDto[];
}
