import { CompanyAsset } from 'src/company-assets/entities/company-asset.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AssetsLiability {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @Column()
  assetLiabilityName: string; // 자산 제목
  @Column()
  assetLiabilityType: string; // 자산 타입 ex) 토지, 건물, 무형자산 등등
  @Column()
  assetLiabilityDesc: string; // 자산 설명
  @Column()
  current: boolean; // true =  유동자산 or false = 부동자산
  @Column()
  assetOrLiability: boolean; // true = 자산  or false = 부채
  @Column({ type: 'decimal', precision: 20, scale: 0 })
  assetValue: string;
  @ManyToOne(() => CompanyAsset, (asset) => asset.totalAssetsDesc, {
    onDelete: 'CASCADE',
  })
  companyAsset: CompanyAsset;
}
