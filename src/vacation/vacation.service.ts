import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacation } from './entities/vacation.entity';
import { annualCalculator } from './vacation-util/vacation-util.util';
import { UserService } from 'src/user/user.service';

@Injectable()
export class VacationService {
  constructor(
    @InjectRepository(Vacation) private vacationRepo: Repository<Vacation>,
    private readonly userService: UserService,
  ) {}
  async createVacation(userId: number, createVacationDto: CreateVacationDto) {
    const user = await this.userService.findOne(userId);
    const vacation = this.vacationRepo.create({
      joinCompanyDate:
        Date.now().toString() || createVacationDto.joinCompanyDate,
      other: createVacationDto.other,
      appearence: 0,
      annual: annualCalculator(createVacationDto.joinCompanyDate),
      restAnnualVacation: annualCalculator(createVacationDto.joinCompanyDate),
      restOtherVacation: createVacationDto.other,
      totalVacation:
        annualCalculator(createVacationDto.joinCompanyDate) +
        createVacationDto.other,
      user,
    });
    await this.vacationRepo.save(vacation);
    return { msg: '휴가가 생성되었습니다.' };
  }

  findAllVacation() {
    return `This action returns all vacation`;
  }

  async findOneVacation(vacationId: number) {
    const vacation = await this.vacationRepo.findOneBy({ id: vacationId });
    if (!vacation) {
      throw new NotFoundException('연차를 찾을 수 없습니다.');
    }
    return vacation;
  }

  async updateVacation(
    vacationId: number,
    updateVacationDto: UpdateVacationDto,
  ) {
    const vacation = await this.findOneVacation(vacationId);
    await this.vacationRepo.update(
      { id: vacationId },
      {
        joinCompanyDate:
          vacation.joinCompanyDate || updateVacationDto.joinCompanyDate,
        other: vacation.other || updateVacationDto.other,
        annual:
          vacation.annual ||
          annualCalculator(updateVacationDto.joinCompanyDate + ''),
        restAnnualVacation:
          vacation.restAnnualVacation ||
          annualCalculator(updateVacationDto.joinCompanyDate + ''),
        restOtherVacation:
          vacation.restOtherVacation || updateVacationDto.other,
        totalVacation:
          vacation.totalVacation ||
          annualCalculator(updateVacationDto.joinCompanyDate + '') +
            (updateVacationDto.other || 0),
      },
    );
    return { msg: '휴가 모델이 업데이트되었습니다.' };
  }

  removeVacation(id: number) {
    return `This action removes a #${id} vacation`;
  }
}
