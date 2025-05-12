import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacation } from './entities/vacation.entity';
import { annualCalculator } from './vacation-util/vacation-util.util';
import { UserService } from 'src/user/user.service';
import { CompanyService } from 'src/company/company.service';
import { TokenService } from 'src/auth/token.service';

@Injectable()
export class VacationService {
  constructor(
    @InjectRepository(Vacation) private vacationRepo: Repository<Vacation>,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
    private readonly tokenService: TokenService,
  ) {}
  async createVacation(
    companyId: number,
    targetUserId: number,
    createVacationDto: CreateVacationDto,
  ) {
    const company = await this.companyService.findOneCompany(companyId);
    const user = await this.userService.findOne(targetUserId);
    const vacation = this.vacationRepo.create({
      joinCompanyDate: createVacationDto.joinCompanyDate,
      other: Number(createVacationDto.other),
      appearence: 0,
      annual: annualCalculator(createVacationDto.joinCompanyDate),
      restAnnualVacation: annualCalculator(createVacationDto.joinCompanyDate),
      restOtherVacation: Number(createVacationDto.other),
      totalVacation:
        annualCalculator(createVacationDto.joinCompanyDate) +
        Number(createVacationDto.other),
      user,
      company,
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
        other: vacation.other || Number(updateVacationDto.other),
        annual:
          vacation.annual ||
          annualCalculator(updateVacationDto.joinCompanyDate + ''),
        restAnnualVacation:
          vacation.restAnnualVacation ||
          annualCalculator(updateVacationDto.joinCompanyDate + ''),
        restOtherVacation:
          vacation.restOtherVacation || Number(updateVacationDto.other),
        totalVacation:
          vacation.totalVacation ||
          annualCalculator(updateVacationDto.joinCompanyDate + '') +
            (Number(updateVacationDto.other) || 0),
      },
    );
    return { msg: '휴가 모델이 업데이트되었습니다.' };
  }

  removeVacation(id: number) {
    return `This action removes a #${id} vacation`;
  }
}
