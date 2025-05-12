import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyService } from '../company.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyConnectService {
  constructor(
    private readonly companyService: CompanyService,
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}
  async getConnectedCompany(id: number) {
    const company = await this.companyRepo.findOne({
      where: { id },
      relations: { connectedCompany: true },
    });
    if (!company) {
      throw new NotFoundException('찾으시는 회사가 없습니다.');
    }
    if (company.connectedCompany.length < 1) {
      throw new NotFoundException('납품처로 등록된 회사가 없습니다.');
    }
    return company.connectedCompany;
  }
  async connectCompany(id: number, t_companyID: number) {
    const myCompany = await this.companyService.findOneCompany(id);
    const t_company = await this.companyService.findOneCompany(t_companyID);
    myCompany.connectedCompany.push(t_company);
    t_company.connectingCompany.push(myCompany);
    await this.companyRepo.save(myCompany);
    await this.companyRepo.save(t_company);
    return { msg: '거래처 등록이 되었습니다.' };
  }
  async disConnectCompany(id: number, t_companyID: number) {
    const myCompany = await this.companyService.findOneCompany(id);
    const t_company = await this.companyService.findOneCompany(t_companyID);
    myCompany.connectedCompany = myCompany.connectedCompany.filter(
      (company) => company.id !== t_company.id,
    );
    t_company.connectingCompany = t_company.connectingCompany.filter(
      (company) => company.id !== myCompany.id,
    );
    await this.companyRepo.save(myCompany);
    await this.companyRepo.save(t_company);
    return { msg: '거래처 등록을 해지하였습니다.' };
  }
}
