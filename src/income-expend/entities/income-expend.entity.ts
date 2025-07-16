import { CompanyAsset } from 'src/company-assets/entities/company-asset.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TPaymentSwitch {
  WAIT = 'WAIT',
  PAID = 'PAID',
  NONPAID = 'NONPAID',
}
@Entity()
export class IncomeExpend {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @Column()
  incomeTrue: boolean; // true = 수입 or false = 지출
  @Column()
  title: string;
  @Column()
  cost: number; // 가격
  @Column()
  businessDate: string; // 거래일자 수동기입
  @Column()
  paymentType: string; // 카드 / 현금 / 등등
  @Column()
  businessDesc: string; // 거래 설명
  @Column({
    type: 'text',
    enum: TPaymentSwitch,
    default: TPaymentSwitch.NONPAID,
  })
  paymentsDone: TPaymentSwitch;
  @ManyToOne(() => CompanyAsset, (asset) => asset.allIncomeExpend, {
    onDelete: 'CASCADE',
  })
  companyAsset: CompanyAsset;
  @OneToOne(() => Product, (product) => product.incomeExpend, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Product;
}
