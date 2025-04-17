import { Company } from 'src/company/entities/company.entity';
import { Salary } from 'src/salary/entities/salary.entity';
import { Vacation } from 'src/vacation/entities/vacation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @Column({ unique: true })
  email: string;
  @Column()
  userName: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  password: string;
  @Column()
  phone: string;
  @Column({ default: '' })
  avatarUrl: string;
  @Column({ default: '' })
  refreshToken: string;
  @OneToMany(() => Company, (company) => company.companyOwner)
  ownedCompany: Company[];
  @ManyToMany(() => Company, (company) => company.companyManager)
  managedCompany: Company[];
  @ManyToMany(() => Company, (company) => company.companyWorker)
  workAtCompany: Company[];
  @OneToMany(() => Salary, (salary) => salary.user)
  salary: Salary[];
  @OneToMany(() => Vacation, (vacation) => vacation.user)
  vacation: Vacation[];
}
