import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { TokenService } from 'src/auth/token.service';

import { Company } from 'src/company/entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerGuard implements CanActivate {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
    private readonly tokenService: TokenService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const refreshToken = req.headers.authorization?.split(' ')[1];

    if (!refreshToken) {
      throw new UnauthorizedException('로그인을 하세요.');
    }
    const { userId } =
      await this.tokenService.verifiedRefreshToken(refreshToken);
    const manager = await this.companyRepo.findOne({
      where: { companyManager: { id: Number(userId) } },
      select: { id: true },
    });
    if (!manager) {
      throw new BadRequestException('매니저가 아닙니다.');
    }
    return Boolean(manager.id);
  }
}
