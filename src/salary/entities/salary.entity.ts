import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Salary {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updateAt: string;
  @Column()
  preTaxMonthlySalary: number;
  @Column()
  familyCount: number;
  @Column()
  childCount: number;
  @Column()
  annualSalary: number;
  @Column()
  earnIncomeDedution: number;
  @Column()
  earnIncomeAmount: number;
  @Column()
  familyDedution: number;
  @Column()
  pensionInsuranceDedution: number;
  @Column()
  specialIncomeDedution: number;
  @Column()
  taxBase: number;
  @Column()
  taxCalculate: number;
  @Column()
  taxDetermined: number;
  @Column()
  earnIncomeTaxCredit: number;
  @Column()
  simplifiedTax: number;
  @Column()
  childTax: number;
  @ManyToOne(() => User, (user) => user.salary)
  user: User;
}
