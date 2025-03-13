import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  ParamData,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Session } from 'express-session';
import { Company } from 'src/company/entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const { id } = req.params as ParamData & { id: string };
    const { uid } = req.session as Session & { uid: string };
    if (!uid) {
      return false;
    }
    const isOwner = await this.companyRepo.findOne({
      where: {
        id: Number(id),
        companyOwner: { id: Number(uid) },
      },
      select: {
        id: true,
      },
    });
    if (!isOwner) {
      throw new BadRequestException('권한이 없습니다.');
    }
    return Boolean(isOwner);
  }
}
