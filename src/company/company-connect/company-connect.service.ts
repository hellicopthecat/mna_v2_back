import { Injectable } from '@nestjs/common';
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
