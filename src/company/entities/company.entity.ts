import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
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
  // @OneToMany(() => User, (user) => user.id)
  // companyWorker: User[];
  // @ManyToMany(() => Company, (com) => com.id)
  // connectedCompany: Company[];
  // @Column()
  // connectedCompanyCount: number;
  // @ManyToMany(() => Company, (com) => com.id)
  // connectingCompany: Company[];
  // @Column()
  // connectingCompanyCount: number;
  // companyProduct: [Product]
  // inNout: InNout!
  // workerVacation: [Vacation]
  // workerSalary: [Salary]
}
