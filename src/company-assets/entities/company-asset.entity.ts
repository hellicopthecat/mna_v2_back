import { Expose } from 'class-transformer';
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
  JoinColumn,
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
  @JoinColumn()
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
  @Expose()
  get totalAssets(): string {
    if (
      !Array.isArray(this.totalAssetsDesc) ||
      this.totalAssetsDesc.length < 1
    ) {
      return '0';
    }
    const total = this.totalAssetsDesc.reduce((prev, current) => {
      return prev + BigInt(current.assetValue);
    }, BigInt(0));
    return total.toString();
  }
  // 유동자산내역
  @Expose()
  get currentAssetsDesc(): AssetsLiability[] {
    if (
      !Array.isArray(this.totalAssetsDesc) ||
      this.totalAssetsDesc.length < 1
    ) {
      return [];
    }
    return this.totalAssetsDesc.filter(
      (asset) => asset.current && asset.assetOrLiability,
    );
  }
  // 유동자산
  @Expose()
  get currentAssets(): string {
    if (
      !Array.isArray(this.currentAssetsDesc) ||
      this.currentAssetsDesc.length < 1
    ) {
      return '0';
    }
    const total = this.currentAssetsDesc.reduce((prev, current) => {
      return prev + BigInt(current.assetValue);
    }, BigInt(0));
    return total.toString();
  }

  // 비유동자산내역
  @Expose()
  get nonCurrentAssetsDesc(): AssetsLiability[] {
    if (
      !Array.isArray(this.totalAssetsDesc) ||
      this.totalAssetsDesc.length < 1
    ) {
      return [];
    }
    return this.totalAssetsDesc.filter(
      (asset) => !asset.current && asset.assetOrLiability,
    );
  }
  // 비유동자산
  @Expose()
  get nonCurrentAssets(): string {
    if (
      !Array.isArray(this.nonCurrentAssetsDesc) ||
      this.nonCurrentAssetsDesc.length < 1
    ) {
      return '0';
    }
    const total = this.nonCurrentAssetsDesc.reduce((prev, current) => {
      return prev + BigInt(current.assetValue);
    }, BigInt(0));
    return total.toString();
  }

  // 유동부채
  @Expose()
  get currentLiabilitiesDesc(): AssetsLiability[] {
    if (
      !Array.isArray(this.totalAssetsDesc) ||
      this.totalAssetsDesc.length < 1
    ) {
      return [];
    }
    return (
      this.totalAssetsDesc.filter(
        (asset) => asset.current && !asset.assetOrLiability,
      ) || []
    );
  }

  // 유동부채
  @Expose()
  get currentLiabilities(): string {
    if (
      !Array.isArray(this.currentLiabilitiesDesc) ||
      this.currentLiabilitiesDesc.length < 1
    ) {
      return '0';
    }
    const total = this.currentLiabilitiesDesc.reduce((prev, current) => {
      return prev + BigInt(current.assetValue);
    }, BigInt(0));
    return total.toString();
  }

  // 비유동부채내역
  @Expose()
  get nonCurrentLiabilitiesDesc(): AssetsLiability[] {
    if (
      !Array.isArray(this.totalAssetsDesc) ||
      this.totalAssetsDesc.length < 1
    ) {
      return [];
    }
    return this.totalAssetsDesc.filter(
      (asset) => !asset.current && !asset.assetOrLiability,
    );
  }

  // 비유동부채
  @Expose()
  get nonCurrentLiabilities(): string {
    if (
      !Array.isArray(this.nonCurrentLiabilitiesDesc) ||
      this.nonCurrentLiabilitiesDesc.length < 1
    ) {
      return '0';
    }
    const total = this.nonCurrentLiabilitiesDesc.reduce((prev, current) => {
      return prev + BigInt(current.assetValue);
    }, BigInt(0));
    return total.toString();
  }

  // 부채
  @Expose()
  get liabilities(): string {
    const total =
      BigInt(this.currentLiabilities) + BigInt(this.nonCurrentLiabilities);
    return total.toString();
  }
  // 순자산
  @Expose()
  get netAssets(): string {
    const total = BigInt(this.totalAssets) - BigInt(this.liabilities);
    return total.toString();
  }
  // 자본
  @Expose()
  get capital(): string {
    const total =
      BigInt(this.budget) + BigInt(this.netAssets) - BigInt(this.liabilities);
    return total.toString();
  }
  // 수입지출항목
  @OneToMany(() => IncomeExpend, (ie) => ie.companyAsset)
  allIncomeExpend: IncomeExpend[];

  //수입항목
  @Expose()
  get incomeModel(): IncomeExpend[] {
    if (
      !Array.isArray(this.allIncomeExpend) ||
      this.allIncomeExpend.length < 1
    ) {
      return [];
    }
    return this.allIncomeExpend.filter(
      (ie) => ie.incomeTrue && ie.paymentsDone === TPaymentSwitch.PAID,
    );
  }
  //수입금액 - 총수익
  @Expose()
  get incomeMoney(): string {
    if (!Array.isArray(this.incomeModel) || this.incomeModel.length < 1) {
      return '0';
    }
    const total = this.incomeModel.reduce((prev, current) => {
      return prev + BigInt(current.cost);
    }, BigInt(0));
    return total.toString();
  }
  //지출항목
  @Expose()
  get expendModel(): IncomeExpend[] {
    if (
      !Array.isArray(this.allIncomeExpend) ||
      this.allIncomeExpend.length < 1
    ) {
      return [];
    }
    return this.allIncomeExpend.filter(
      (ie) => !ie.incomeTrue && ie.paymentsDone === TPaymentSwitch.PAID,
    );
  }

  // 총 비용
  @Expose()
  get expendMoney(): string {
    if (!Array.isArray(this.expendModel) || this.expendModel.length < 1) {
      return '0';
    }
    const total = this.expendModel.reduce((prev, current) => {
      return prev + BigInt(current.cost);
    }, BigInt(0));
    return total.toString();
  }

  @Expose()
  get waitIncomeModel(): IncomeExpend[] {
    if (!Array.isArray(this.allIncomeExpend) || this.expendModel.length < 1) {
      return [];
    }
    return this.allIncomeExpend.filter(
      (ie) => ie.incomeTrue && ie.paymentsDone === TPaymentSwitch.WAIT,
    );
  }
  @Expose()
  get waitIncomeMoney(): string {
    if (
      !Array.isArray(this.waitIncomeModel) ||
      this.waitIncomeModel.length < 1
    ) {
      return '0';
    }
    const total = this.waitIncomeModel.reduce(
      (prev, current) => prev + BigInt(current.cost),
      BigInt(0),
    );
    return total.toString();
  }

  @Expose()
  get waitExpendModel(): IncomeExpend[] {
    if (
      !Array.isArray(this.allIncomeExpend) ||
      this.allIncomeExpend.length < 1
    ) {
      return [];
    }
    return this.allIncomeExpend.filter(
      (ie) => !ie.incomeTrue && ie.paymentsDone === TPaymentSwitch.WAIT,
    );
  }
  @Expose()
  get waitExpendMoney(): string {
    if (
      !Array.isArray(this.waitExpendModel) ||
      this.waitExpendModel.length < 1
    ) {
      return '0';
    }
    const total = this.waitExpendModel.reduce(
      (prev, current) => prev + BigInt(current.cost),
      BigInt(0),
    );
    return total.toString();
  }
  // 손익계산
  // 순이익
  @Expose()
  get netIncome(): string {
    const result = BigInt(this.incomeMoney) - BigInt(this.expendMoney);
    return result.toString();
  }
  // 재무지표
  // 자기자본비율
  @Expose()
  get equityRatio(): string {
    if (BigInt(this.totalAssets) === BigInt(0)) {
      return '0';
    }
    const capital = BigInt(this.totalAssets) - BigInt(this.liabilities);
    const result = (capital * BigInt(10000)) / BigInt(this.totalAssets);
    const ratio = Number(result) / 100;
    return ratio.toFixed(2);
  }
  // 이익률
  @Expose()
  get profitMargin(): string {
    if (BigInt(this.liabilities) === BigInt(0)) {
      return '0';
    }
    const result =
      (BigInt(this.incomeMoney) * BigInt(10000)) / BigInt(this.liabilities);
    const margin = Number(result) / 100;
    return margin.toFixed(2);
  }
  // 부채비율
  @Expose()
  get debtRatio(): string {
    if (BigInt(this.totalAssets) === BigInt(0)) {
      return '0';
    }
    const result =
      (BigInt(this.liabilities) * BigInt(10000)) / BigInt(this.totalAssets);
    const ratio = Number(result) / 100;
    return ratio.toFixed(2);
  }
  // 자기자본이익률
  @Expose()
  get roe(): string {
    if (BigInt(this.netAssets) === BigInt(0)) {
      return '0';
    }
    const result =
      (BigInt(this.netIncome) * BigInt(10000)) / BigInt(this.netAssets);
    const roe = Number(result) / 100;
    return roe.toFixed(2);
  }
}
