import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyConnectService {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}
  async getCompanyExceptConnectedCompany(id: number, companyName: string) {
    const myCompany = await this.companyRepo.findOne({
      where: { id },
      relations: { connectedCompany: true },
    });
    if (!myCompany) {
      throw new NotFoundException('내 회사를 조회할 수 없습니다.');
    }
    const companiesResult = await this.companyRepo.findBy({
      companyName: Like(`%${companyName}%`),
    });
    const result = companiesResult.filter((company) => {
      const existCompany = myCompany.connectedCompany.some(
        (connected) => connected.id === company.id,
      );
      const isMyCompany = company.id === myCompany.id;
      return !existCompany && !isMyCompany;
    });
    if (result.length < 1) {
      throw new NotFoundException('찾으시는 회사를 조회할 수 없습니다.');
    }
    return result;
  }
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
    const myCompany = await this.companyRepo.findOne({
      where: { id },
      relations: { connectedCompany: true },
    });
    if (!myCompany) {
      throw new NotFoundException('나의 회사가 조회되지 않았습니다.');
    }
    const t_company = await this.companyRepo.findOne({
      where: { id: t_companyID },
      relations: { connectingCompany: true },
    });
    if (!t_company) {
      throw new NotFoundException('등록하려는 회사가 조회되지 않았습니다.');
    }
    myCompany.connectedCompany.push(t_company);
    t_company.connectingCompany.push(myCompany);
    await this.companyRepo.save(myCompany);
    await this.companyRepo.save(t_company);
    return { msg: '거래처 등록이 되었습니다.' };
  }
  async disConnectCompany(id: number, t_companyID: number) {
    const myCompany = await this.companyRepo.findOne({
      where: { id },
      relations: { connectedCompany: true },
    });
    if (!myCompany) {
      throw new NotFoundException('나의 회사가 조회되지 않았습니다.');
    }
    const t_company = await this.companyRepo.findOne({
      where: { id: t_companyID },
      relations: { connectingCompany: true },
    });
    if (!t_company) {
      throw new NotFoundException('등록하려는 회사가 조회되지 않았습니다.');
    }
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
