import { Expose, Type } from 'class-transformer';
import { CompanyDto } from 'src/company/dto/company.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { VacationDesc } from 'src/vacation-desc/entities/vacation-desc.entity';

export class VacationDto {
  @Expose()
  id: number;
  @Expose()
  createdAt: Date;
  @Expose()
  updateAt: Date;
  @Expose()
  joinCompanyDate: string;
  @Expose()
  appearence: number;
  @Expose()
  annual: number;
  @Expose()
  other: number;
  @Expose()
  restAnnualVacation: number;
  @Expose()
  restOtherVacation: number;
  @Expose()
  totalVacation: number;
  @Expose()
  description: VacationDesc[];
  @Expose()
  @Type(() => UserDto)
  user: UserDto;
  @Expose()
  @Type(() => CompanyDto)
  company: CompanyDto;
}
