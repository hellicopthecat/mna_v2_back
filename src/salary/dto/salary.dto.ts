import { Expose, Type } from 'class-transformer';
import { CompanyDto } from 'src/company/dto/company.dto';
import { UserDto } from 'src/user/dto/user.dto';
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

export class SalaryDto {
  @Expose()
  id: number;
  @Expose()
  createdAt: string;
  @Expose()
  updateAt: string;
  @Expose()
  preTaxMonthlySalary: number;
  @Expose()
  familyCount: number;
  @Expose()
  childCount: number;
  //computed
  /** 연봉 */
  @Expose()
  get annualSalary(): number {
    return this.preTaxMonthlySalary * 12;
  }
  @Expose()
  /**근로소득공제금액 */
  get earnIncomeDedution(): number {
    const result = earnIncomeDedutionFn(this.annualSalary);
    return !result ? 0 : result;
  }
  @Expose()
  /**근로소득금액 */
  get earnIncomeAmount(): number {
    return this.annualSalary - this.earnIncomeDedution;
  }
  @Expose()
  /**인적공제 */
  get familyDedution(): number {
    return familyDedutionFn(this.familyCount);
  }
  @Expose()
  /**연금보험료공제 */
  get pensionInsuranceDedution(): number {
    return pensionInsuranceDedutionFn(this.preTaxMonthlySalary);
  }
  @Expose()
  /**특별소득공제 */
  get specialIncomeDedution(): number {
    const result = specialIncomeDedutionFn(this.annualSalary, this.familyCount);
    return !result ? 0 : result;
  }
  @Expose()
  /**과세표준 */
  get taxBase(): number {
    return taxBaseFn(
      this.earnIncomeAmount,
      this.familyDedution,
      this.pensionInsuranceDedution,
      this.specialIncomeDedution,
    );
  }
  @Expose()
  /**산출세엑 */
  get taxCalculate(): number {
    const result = taxCalculateFn(this.taxBase);
    return !result ? 0 : result;
  }
  @Expose()
  /**근로소득세액공제 */
  get earnIncomeTaxCredit(): number {
    const result = earnIncomeTaxCreditFn(this.annualSalary, this.taxCalculate);
    return Math.floor(!result ? 0 : result / 100) * 100;
  }
  @Expose()
  /**결정세액  */
  get taxDetermined(): number {
    return (
      Math.floor((this.taxCalculate - this.earnIncomeTaxCredit) / 100) * 100
    );
  }
  @Expose()
  /**간이세액 */
  get simplifiedTax(): number {
    return simplifiedTaxFn(this.taxDetermined);
  }
  @Expose()
  //자녀세금
  get childTax(): number {
    return childTaxFn(this.childCount);
  }
  @Expose()
  @Type(() => UserDto)
  user: UserDto;
  @Expose()
  @Type(() => CompanyDto)
  company: CompanyDto;
}
