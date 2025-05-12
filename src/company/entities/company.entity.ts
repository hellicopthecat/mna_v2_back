import { CompanyAsset } from 'src/company-assets/entities/company-asset.entity';
import { Product } from 'src/product/entities/product.entity';
import { Salary } from 'src/salary/entities/salary.entity';
import { User } from 'src/user/entities/user.entity';
import { Vacation } from 'src/vacation/entities/vacation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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
  @Column()
  companyLogo: string;
  @Column()
  zonecode: string;
  @Column()
  sido: string;
  @Column()
  sigungu: string;
  @Column()
  roadname: string;
  @Column()
  roadAddress: string;
  @Column()
  restAddress: string;
  @Column()
  bname: string;
  @Column()
  bname1: string;
  @Column()
  bname2: string;
  @Column()
  jibunAddress: string;
  @ManyToOne(() => User, (user) => user.ownedCompany)
  companyOwner: User;
  @ManyToMany(() => User, (user) => user.managedCompany)
  @JoinTable()
  companyManager: User[];
  @ManyToMany(() => User, (user) => user.workAtCompany)
  @JoinTable()
  companyWorker: User[];
  @ManyToMany(() => Company, (company) => company.connectingCompany)
  @JoinTable()
  connectedCompany: Company[];
  @ManyToMany(() => Company, (company) => company.connectedCompany)
  @JoinTable()
  connectingCompany: Company[];
  @OneToOne(() => CompanyAsset, (companyAsset) => companyAsset.company)
  companyAssets: CompanyAsset;
  @OneToMany(() => Product, (product) => product.company)
  companyProduct: Product[];
  @OneToMany(() => Vacation, (vacation) => vacation.company)
  workerVacation: Vacation[];
  @OneToMany(() => Salary, (salary) => salary.company)
  workerSalary: Salary[];
}
