import { CompanyAsset } from 'src/company-assets/entities/company-asset.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @Column({ unique: true })
  companyName: string;
  @OneToMany(() => User, (user) => user.id)
  companyOwner: User;
  @Column()
  companyLogo: string;
  @Column()
  country: string;
  @Column()
  addressCity: string;
  @Column()
  streetAddress: string;
  @Column()
  restAddress: string;
  @Column()
  addressNum: string;
  @ManyToMany(() => User, (user) => user.managedCompany)
  companyManager: User[];
  @OneToMany(() => User, (user) => user.workAtCompany)
  companyWorker: User[];
  @ManyToMany(() => Company, (company) => company.connectingCompany)
  connectedCompany: Company[];
  @ManyToMany(() => Company, (company) => company.connectedCompany)
  connectingCompany: Company[];
  @OneToOne(() => CompanyAsset, (companyAsset) => companyAsset.company)
  companyAssets: CompanyAsset;
  @OneToMany(() => Product, (product) => product.company)
  companyProduct: Product[];
  // workerVacation: [Vacation]
  // workerSalary: [Salary]
}
