import { AssetsLiability } from 'src/assets-liabilities/entities/assets-liability.entity';
import { Company } from 'src/company/entities/company.entity';
import {
  IncomeExpend,
  TPaymentSwitch,
} from 'src/income-expend/entities/income-expend.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CompanyAsset {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @OneToOne(() => Company, (company) => company.companyAssets)
  company: Company;
  @Column()
  budget: number; //예산
  @Column()
  accountNum: string;
  @Column()
  accountName: string;
  @Column()
  accountDesc: string;
  //   재무항목
  @OneToMany(
    () => AssetsLiability,
    (assetLiability) => assetLiability.companyAsset,
  )
  totalAssetsDesc: AssetsLiability[]; // 자산 및 부채 내역
  /* computed */
  // 자산 및 부채 금액
  get totalAssets(): string {
    const total = this.totalAssetsDesc.reduce((prev, current) => {
      return prev + BigInt(current.assetValue);
    }, BigInt(0));
    return total.toString();
  }
  // 유동자산내역
  get currentAssetsDesc(): AssetsLiability[] {
    return (
      this.totalAssetsDesc.filter(
        (asset) => asset.current && asset.assetOrLiability,
      ) || []
    );
  }
  // 유동자산
  get currentAssets(): string {
    const total = this.currentAssetsDesc.reduce((prev, current) => {
      return prev + BigInt(current.assetValue);
    }, BigInt(0));
    return total.toString();
  }
  // 비유동자산내역
  get nonCurrentAssetsDesc(): AssetsLiability[] {
    return (
      this.totalAssetsDesc.filter(
        (asset) => !asset.current && asset.assetOrLiability,
      ) || []
    );
  }
  // 비유동자산
  get nonCurrentAssets(): string {
    const total = this.nonCurrentAssetsDesc.reduce((prev, current) => {
      return prev + BigInt(current.assetValue);
    }, BigInt(0));
    return total.toString();
  }
  // 유동부채

  get currentLiabilitiesDesc(): AssetsLiability[] {
    return (
      this.totalAssetsDesc.filter(
        (asset) => asset.current && !asset.assetOrLiability,
      ) || []
    );
  }
  // 유동부채
  get currentLiabilities(): string {
    const total = this.currentLiabilitiesDesc.reduce((prev, current) => {
      return prev + BigInt(current.assetValue);
    }, BigInt(0));
    return total.toString();
  }
  // 비유동부채내역
  get nonCurrentLiabilitiesDesc(): AssetsLiability[] {
    return (
      this.totalAssetsDesc.filter(
        (asset) => !asset.current && !asset.assetOrLiability,
      ) || []
    );
  }
  // 비유동부채
  get nonCurrentLiabilities(): string {
    const total = this.nonCurrentLiabilitiesDesc.reduce((prev, current) => {
      return prev + BigInt(current.assetValue);
    }, BigInt(0));
    return total.toString();
  }

  // 부채
  get liabilities(): string {
    const total =
      BigInt(this.currentLiabilities) + BigInt(this.nonCurrentLiabilities);
    return total.toString();
  }
  // 순자산
  get netAssets(): string {
    const total = BigInt(this.totalAssets) - BigInt(this.liabilities);
    return total.toString();
  }
  // 자본
  get capital(): string {
    const total =
      BigInt(this.budget) + BigInt(this.netAssets) - BigInt(this.liabilities);
    return total.toString();
  }
  // 수입지출항목
  @OneToMany(() => IncomeExpend, (ie) => ie.companyAsset)
  allIncomeExpend: IncomeExpend[];
  //수입항목
  get incomeModel(): IncomeExpend[] {
    return this.allIncomeExpend.filter(
      (ie) => ie.incomeTrue && ie.paymentsDone === TPaymentSwitch.PAID,
    );
  }
  //수입금액 - 총수익
  get incomeMoney(): string {
    const total = this.incomeModel.reduce((prev, current) => {
      return prev + BigInt(current.cost);
    }, BigInt(0));
    return total.toString();
  }
  //지출항목
  get expendModel(): IncomeExpend[] {
    return this.allIncomeExpend.filter(
      (ie) => !ie.incomeTrue && ie.paymentsDone === TPaymentSwitch.PAID,
    );
  }
  // 총 비용
  get expendMoney(): string {
    const total = this.expendModel.reduce((prev, current) => {
      return prev + BigInt(current.cost);
    }, BigInt(0));
    return total.toString();
  }
  get waitIncomeModel(): IncomeExpend[] {
    return this.allIncomeExpend.filter(
      (ie) => ie.incomeTrue && ie.paymentsDone === TPaymentSwitch.WAIT,
    );
  }
  get waitIncomeMoney(): string {
    const total = this.waitIncomeModel.reduce(
      (prev, current) => prev + BigInt(current.cost),
      BigInt(0),
    );
    return total.toString();
  }
  get waitExpendModel(): IncomeExpend[] {
    return this.allIncomeExpend.filter(
      (ie) => !ie.incomeTrue && ie.paymentsDone === TPaymentSwitch.WAIT,
    );
  }
  get waitExpendMoney(): string {
    const total = this.waitExpendModel.reduce(
      (prev, current) => prev + BigInt(current.cost),
      BigInt(0),
    );
    return total.toString();
  }
  // 손익계산
  // 순이익
  get netIncome(): string {
    const result = BigInt(this.incomeMoney) - BigInt(this.expendMoney);
    return result.toString();
  }
  // 재무지표
  // 자기자본비율
  @Column({ type: 'decimal', precision: 10, scale: 3 })
  get equityRatio(): string {
    const capital = BigInt(this.totalAssets) - BigInt(this.liabilities);
    const result = (capital / BigInt(this.totalAssets)) * BigInt(100);
    return result.toString();
  }
  // 이익률
  @Column({ type: 'decimal', precision: 10, scale: 3 })
  get profitMargin(): string {
    const result =
      (BigInt(this.incomeMoney) / BigInt(this.liabilities)) * BigInt(100);
    return result.toString();
  }
  // 부채비율
  @Column({ type: 'decimal', precision: 10, scale: 3 })
  get debtRatio(): string {
    const result =
      (BigInt(this.liabilities) / BigInt(this.totalAssets)) * BigInt(100);
    return result.toString();
  }
  // 자기자본이익률
  @Column({ type: 'decimal', precision: 10, scale: 3 })
  get roe(): string {
    const result =
      (BigInt(this.netIncome) / BigInt(this.netAssets)) * BigInt(100);
    return result.toString();
  }
}
