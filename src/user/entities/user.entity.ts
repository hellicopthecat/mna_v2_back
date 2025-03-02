import { Company } from 'src/company/entities/company.entity';
import { Salary } from 'src/salary/entities/salary.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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
  @ManyToMany(() => Company, (company) => company.companyManager)
  @JoinTable({ name: 'managedCompanyId' })
  managedCompany: Company[];
  // @OneToMany(() => Salary, (salary) => salary.user)
  // salary: Salary[];
}
