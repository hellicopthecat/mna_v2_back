import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  childTaxFn,
  earnIncomeDedutionFn,
  earnIncomeTaxCreditFn,
  familyDedutionFn,
  pensionInsuranceDedutionFn,
  simplifiedTaxFn,
  specialIncomeDedutionFn,
  taxBaseFn,
  taxCalculateFn,
} from '../salary-util/salary-util.util';
import { Company } from 'src/company/entities/company.entity';

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
  //computed
  /** 연봉 */
  get annualSalary(): number {
    return this.preTaxMonthlySalary * 12;
  }
  /**근로소득공제금액 */
  get earnIncomeDedution(): number {
    const result = earnIncomeDedutionFn(this.annualSalary);
    return !result ? 0 : result;
  }
  /**근로소득금액 */
  get earnIncomeAmount(): number {
    return this.annualSalary - this.earnIncomeDedution;
  }
  /**인적공제 */
  get familyDedution(): number {
    return familyDedutionFn(this.familyCount);
  }
  /**연금보험료공제 */
  get pensionInsuranceDedution(): number {
    return pensionInsuranceDedutionFn(this.preTaxMonthlySalary);
  }
  /**특별소득공제 */
  get specialIncomeDedution(): number {
    const result = specialIncomeDedutionFn(this.annualSalary, this.familyCount);
    return !result ? 0 : result;
  }
  /**과세표준 */
  get taxBase(): number {
    return taxBaseFn(
      this.earnIncomeAmount,
      this.familyDedution,
      this.pensionInsuranceDedution,
      this.specialIncomeDedution,
    );
  }
  /**산출세엑 */
  get taxCalculate(): number {
    const result = taxCalculateFn(this.taxBase);
    return !result ? 0 : result;
  }
  /**근로소득세액공제 */

  get earnIncomeTaxCredit(): number {
    const result = earnIncomeTaxCreditFn(this.annualSalary, this.taxCalculate);
    return Math.floor(!result ? 0 : result / 100) * 100;
  }
  /**결정세액  */
  get taxDetermined(): number {
    return (
      Math.floor((this.taxCalculate - this.earnIncomeTaxCredit) / 100) * 100
    );
  }
  /**간이세액 */
  get simplifiedTax(): number {
    return simplifiedTaxFn(this.taxDetermined);
  }
  //자녀세금
  get childTax(): number {
    return childTaxFn(this.childCount);
  }
  @ManyToOne(() => User, (user) => user.salary, { onDelete: 'CASCADE' })
  user: User;
  @ManyToOne(() => Company, (company) => company.workerSalary, {
    onDelete: 'CASCADE',
  })
  company: Company;
}
