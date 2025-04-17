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
export class OwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
    private readonly tokenService: TokenService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const { id } = req.params as { id: string };
    const refreshToken = (req.cookies as { REFRESH_TOKEN: string })
      .REFRESH_TOKEN;
    const { userId } =
      await this.tokenService.verifiedRefreshToken(refreshToken);

    if (!userId) {
      throw new UnauthorizedException('로그인하세요.');
    }
    const isOwner = await this.companyRepo.findOne({
      where: {
        id: Number(id),
        companyOwner: { id: Number(userId) },
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
