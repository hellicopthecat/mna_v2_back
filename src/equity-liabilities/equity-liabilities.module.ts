import { Module } from '@nestjs/common';
import { EquityLiabilitiesService } from './equity-liabilities.service';
import { EquityLiabilitiesController } from './equity-liabilities.controller';

@Module({
  controllers: [EquityLiabilitiesController],
  providers: [EquityLiabilitiesService],
})
export class EquityLiabilitiesModule {}
