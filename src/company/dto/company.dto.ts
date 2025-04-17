import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';

export class CompanyDto {
  @Expose()
  id: number;
  @Expose()
  createdAt: Date;
  @Expose()
  updateAt: Date;
  @Expose()
  companyName: string;
  @Expose()
  companyLogo: string;
  @Expose()
  zonecode: string;
  @Expose()
  sido: string;
  @Expose()
  sigungu: string;
  @Expose()
  roadname: string;
  @Expose()
  roadAddress: string;
  @Expose()
  restAddress: string;
  @Expose()
  bname: string;
  @Expose()
  bname1: string;
  @Expose()
  bname2: string;
  @Expose()
  jibunAddress: string;
  @Expose()
  @Type(() => UserDto)
  companyOwner: UserDto;
}
