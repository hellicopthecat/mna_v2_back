import { Company } from 'src/company/entities/company.entity';
import { IncomeExpend } from 'src/income-expend/entities/income-expend.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @Column()
  transactionTitle: string; //거래제목
  @Column()
  itemName: string; // 상품이름
  @Column()
  itemModelName: string; // 상품모델명
  @Column()
  itemPhoto: string;
  @Column()
  itemType: string;
  @Column()
  itemCount: number;
  @Column()
  itemPrice: number;
  @Column()
  itemDesc: string;
  @ManyToOne(() => Company, (company) => company.companyProduct, {
    onDelete: 'CASCADE',
  })
  company: Company;
  @OneToOne(() => IncomeExpend, (ie) => ie.product)
  incomeExpend: IncomeExpend;
}
