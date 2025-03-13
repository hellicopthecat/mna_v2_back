import { IsBoolean, IsString } from 'class-validator';

export class CreateAssetsLiabilityDto {
  @IsString()
  assetLiabilityName: string; // 자산 제목
  @IsString()
  assetLiabilityType: string; // 자산 타입 ex) 토지, 건물, 무형자산 등등
  @IsString()
  assetLiabilityDesc: string; // 자산 설명
  @IsBoolean()
  current: boolean; // true =  유동자산 or false = 부동자산
  @IsBoolean()
  assetOrLiability: boolean; // true = 자산 or false = 부채
  @IsString()
  assetValue: string;
}
