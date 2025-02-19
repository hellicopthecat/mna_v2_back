import { Expose } from 'class-transformer';
import { Salary } from 'src/salary/entities/salary.entity';

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
  salary: Salary[];
}
