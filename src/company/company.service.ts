import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Like, Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/auth/token.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}
  // 회사생성
  async createCompany(createCompanyDto: CreateCompanyDto, token: string) {
    const existsCompany = await this.companyRepo.findOneBy({
      companyName: createCompanyDto.companyName,
    });
    if (existsCompany) {
      throw new BadRequestException('존재하는 회사입니다.');
    }
    const verifiedToken = await this.tokenService.verifiedRefreshToken(token);
    const user = await this.userService.findOne(Number(verifiedToken.userId));
    const company = this.companyRepo.create({
      ...createCompanyDto,
      companyOwner: user,
      companyManager: [user],
      companyWorker: [user],
    });
    await this.companyRepo.save(company);
    return { userId: user.id };
  }
  // 모든 회사 찾기
  async findAllCompany() {
    return await this.companyRepo.find();
  }
  // 회사 찾기
  async findOneCompany(id: number) {
    const company = await this.companyRepo.findOne({
      where: { id },
      relations: {
        companyOwner: true,
        companyManager: true,
        companyWorker: true,
        companyAssets: true,
        connectedCompany: true,
        connectingCompany: true,
        companyProduct: true,
      },
      select: {
        companyManager: { id: true },
        companyWorker: { id: true },
        companyProduct: { id: true },
        connectedCompany: { id: true },
        connectingCompany: { id: true },
      },
    });
    if (!company) {
      throw new NotFoundException('찾으시는 회사가 존재하지 않습니다.');
    }
    return company;
  }
  // 이름으로 회사 찾기
  async findOneByName(name: string) {
    const company = await this.companyRepo.findBy({
      companyName: Like(`%${name}%`),
    });
    if (!company) {
      throw new NotFoundException('찾으시는 회사가 존재하지 않습니다.');
    }
    if (company.length < 1) {
      throw new NotFoundException('찾으시는 회사가 존재하지 않습니다.');
    }
    return company;
  }
  //내 회사 찾기
  async findOwnCompany(id: number) {
    const ownedCompany = await this.companyRepo
      .createQueryBuilder('company')
      .where('company.companyOwner.id = :id', { id })
      .skip(0)
      .take(3)
      .orderBy('company.id', 'DESC')
      .getMany();
    return ownedCompany;
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
}
