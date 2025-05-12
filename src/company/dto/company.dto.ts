import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';
import { VacationDto } from 'src/vacation/dto/vacation.dto';

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
  @Expose()
  @Type(() => UserDto)
  companyManager: UserDto[];
  @Expose()
  @Type(() => UserDto)
  companyWorker: UserDto[];
  @Expose()
  @Type(() => VacationDto)
  workerVacation: VacationDto[];
  @Expose()
  @Type(() => CompanyDto)
  connectedCompany: CompanyDto[];
  @Expose()
  @Type(() => CompanyDto)
  connectingCompany: CompanyDto[];
  // @OneToOne(() => CompanyAsset, (companyAsset) => companyAsset.company)
  // companyAssets: CompanyAsset;
  // @OneToMany(() => Product, (product) => product.company)
  // companyProduct: Product[];
  // @OneToMany(() => Salary, (salary) => salary.company)
  // workerSalary: Salary[];
}
