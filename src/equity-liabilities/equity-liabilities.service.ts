import { Injectable } from '@nestjs/common';
import { CreateEquityLiabilityDto } from './dto/create-equity-liability.dto';
import { UpdateEquityLiabilityDto } from './dto/update-equity-liability.dto';

@Injectable()
export class EquityLiabilitiesService {
  create(createEquityLiabilityDto: CreateEquityLiabilityDto) {
    return 'This action adds a new equityLiability';
  }

  findAll() {
    return `This action returns all equityLiabilities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equityLiability`;
  }

  update(id: number, updateEquityLiabilityDto: UpdateEquityLiabilityDto) {
    return `This action updates a #${id} equityLiability`;
  }

  remove(id: number) {
    return `This action removes a #${id} equityLiability`;
  }
}
