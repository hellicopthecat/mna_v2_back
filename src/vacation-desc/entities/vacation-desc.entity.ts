import { Vacation } from 'src/vacation/entities/vacation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TVacation {
  ANNUAL = 'ANNUAL',
  SICK = 'SICK',
  HALF = 'HALF',
  OTHER = 'OTHER',
  OTHERSICK = 'OTHERSICK',
}

@Entity()
export class VacationDesc {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @Column()
  vacationType: TVacation;
  @Column()
  day: number;
  @Column()
  description: string;
  @ManyToOne(() => Vacation, (vacation) => vacation.description, {
    onDelete: 'CASCADE',
  })
  vacation: Vacation;
}
