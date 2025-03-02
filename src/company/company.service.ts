import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
    private userService: UserService,
  ) {}
  // 회사생성
  async createCompany(createCompanyDto: CreateCompanyDto, userId: number) {
    const existsCompany = await this.companyRepo.findOneBy({
      companyName: createCompanyDto.companyName,
    });
    if (existsCompany) {
      return new BadRequestException('존재하는 회사입니다.');
    }
    const user = await this.userService.findOne(userId);
    const company = this.companyRepo.create({
      companyOwner: user,
      ...createCompanyDto,
      companyManager: [user],
    });
    await this.companyRepo.save(company);
    return { msg: '회사가 생성되었습니다.' };
  }
  // 모든 회사 찾기
  async findAllCompany() {
    return await this.companyRepo.find();
  }
  // 회사 찾기
  async findOneCompany(id: number) {
    const company = await this.companyRepo.findOne({ where: { id } });
    if (!company) {
      return new NotFoundException('찾으시는 회사가 존재하지 않습니다.');
    }
    return company;
  }
  // 회사 편집
  async updateCompany(id: number, updateCompanyDto: UpdateCompanyDto) {
    const existsCompany = await this.findOneCompany(id);
    if (existsCompany) {
      await this.companyRepo.update({ id }, { ...updateCompanyDto });
    }
    return { msg: '회사의 변경사항을 변경했습니다.' };
  }
  // 회사 삭제
  async removeCompany(id: number) {
    const company = await this.findOneCompany(id);
    if (!company) {
      return;
    }
    await this.companyRepo.delete({ id });
    return { msg: '회사가 삭제되었습니다.' };
  }
  //매니저 추가
  async addManager(id: number, workerId: number) {
    const worker = await this.userService.findOne(workerId);
    const company = await this.companyRepo.findOne({ where: { id } });
    if (!company) {
      return new NotFoundException('회사가 존재하지 않습니다.');
    }
    company?.companyManager.push(worker);
    await this.companyRepo.save(company);
    return { msg: '매니저가 추가되었습니다.' };
  }
  //매니저 삭제
  async removeManager(id: number, workerId: number) {
    const worker = await this.userService.findOne(workerId);
    const company = await this.companyRepo.findOne({ where: { id } });
    if (!company) {
      return new NotFoundException('회사가 존재하지 않습니다.');
    }
    company.companyManager = company.companyManager.filter(
      (user) => user.id === worker.id,
    );
    await this.companyRepo.save(company);
    return { msg: '매니저가 성공적으로 삭제되었습니다.' };
  }
}
