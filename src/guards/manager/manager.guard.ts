import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Session } from 'express-session';
import { Company } from 'src/company/entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerGuard implements CanActivate {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const session = req.session as Session & { uid: string };

    if (!session.uid) {
      return false;
    }
    const manager = await this.companyRepo.findOne({
      where: { companyManager: { id: Number(session.uid) } },
      select: { id: true },
    });

    return Boolean(manager!.id);
  }
}
