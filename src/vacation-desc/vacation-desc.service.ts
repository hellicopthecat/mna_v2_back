import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVacationDescDto } from './dto/create-vacation-desc.dto';
import { UpdateVacationDescDto } from './dto/update-vacation-desc.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TVacation, VacationDesc } from './entities/vacation-desc.entity';
import { VacationService } from 'src/vacation/vacation.service';
import { Vacation } from 'src/vacation/entities/vacation.entity';

@Injectable()
export class VacationDescService {
  constructor(
    @InjectRepository(VacationDesc)
    private vacationDescRepo: Repository<VacationDesc>,
    @InjectRepository(Vacation)
    private vacationRepo: Repository<Vacation>,
    private readonly vacationService: VacationService,
  ) {}
  normalVacation(vacationType: TVacation) {
    return (
      vacationType === TVacation.ANNUAL ||
      vacationType === TVacation.HALF ||
      vacationType === TVacation.SICK
    );
  }
  otherVacation(vacationType: TVacation) {
    return (
      vacationType === TVacation.OTHER || vacationType === TVacation.OTHERSICK
    );
  }
  async createVacationDesc(
    vacationId: number,
    createVacationDescDto: CreateVacationDescDto,
  ) {
    const vacation = await this.vacationService.findOneVacation(vacationId);
    if (
      this.normalVacation(createVacationDescDto.vacationType) &&
      vacation.restAnnualVacation === 0
    ) {
      throw new BadRequestException(
        '남은 연차가 없어 휴가를 생성할 수 없습니다.',
      );
    }
    if (
      (createVacationDescDto.vacationType === TVacation.OTHER ||
        createVacationDescDto.vacationType === TVacation.OTHERSICK) &&
      vacation.restOtherVacation === 0
    ) {
      throw new BadRequestException(
        '남은 기타휴가가 없어 휴가를 생성할 수 없습니다.',
      );
    }
    if (vacation.totalVacation < 1) {
      throw new BadRequestException(
        '남은 휴가가 없어 휴가를 생성할 수 없습니다.',
      );
    }
    if (
      createVacationDescDto.vacationType === TVacation.ANNUAL ||
      createVacationDescDto.vacationType === TVacation.HALF ||
      createVacationDescDto.vacationType === TVacation.SICK
    ) {
      vacation.restAnnualVacation =
        vacation.restAnnualVacation - createVacationDescDto.day;
      await this.vacationRepo.save(vacation);
    }
    const vacationDesc = this.vacationDescRepo.create({
      ...createVacationDescDto,
      vacation,
    });
    await this.vacationDescRepo.save(vacationDesc);

    return { msg: '휴가가 생성되었습니다.' };
  }

  async findOneVacationDesc(vacationDescId: number) {
    const vacationDesc = await this.vacationDescRepo.findOneBy({
      id: vacationDescId,
    });
    if (!vacationDesc) {
      throw new NotFoundException('검색하신 휴가신청이 존재하지 않습니다.');
    }
    return vacationDesc;
  }

  async updateVacationDesc(
    vacationDescId: number,
    updateVacationDescDto: UpdateVacationDescDto,
  ) {
    await this.vacationDescRepo.update(
      { id: vacationDescId },
      updateVacationDescDto,
    );
    return { msg: '휴가가 업데이트되었습니다.' };
  }

  async removeVacationDesc(vacationId: number, vacationDescId: number) {
    const vacation = await this.vacationService.findOneVacation(vacationId);
    const vacationDesc = await this.findOneVacationDesc(vacationDescId);
    if (this.normalVacation(vacationDesc.vacationType)) {
      vacation.restAnnualVacation =
        vacation.restAnnualVacation + vacationDesc.day;
      await this.vacationRepo.save(vacation);
    }
    if (this.otherVacation(vacationDesc.vacationType)) {
      vacation.restOtherVacation =
        vacation.restOtherVacation + vacationDesc.day;
      await this.vacationRepo.save(vacation);
    }

    await this.vacationDescRepo.delete({ id: vacationDescId });
    return { msg: '휴가가 삭제되었습니다.' };
  }
}
