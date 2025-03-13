import { User } from 'src/user/entities/user.entity';
import { VacationDesc } from 'src/vacation-desc/entities/vacation-desc.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Vacation {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @Column()
  joinCompanyDate: string;
  @Column()
  appearence: number;
  @Column({ type: 'float' })
  annual: number;
  @Column({ type: 'float' })
  other: number;
  @Column({ type: 'float' })
  restAnnualVacation: number;
  @Column({ type: 'float' })
  restOtherVacation: number;
  @Column({ type: 'float' })
  totalVacation: number;
  @OneToMany(() => VacationDesc, (desc) => desc.vacation)
  description: VacationDesc[];
  @ManyToOne(() => User, (user) => user.vacation)
  user: User;
  //   company: Company!;
}
