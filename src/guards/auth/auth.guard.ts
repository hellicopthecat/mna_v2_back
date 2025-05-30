import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'src/auth/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req: Request = ctx.switchToHttp().getRequest();
    const authToken = req.headers.authorization;
    const token = authToken?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('로그인이 안되었습니다...');
    }
    const { userId } = await this.tokenService.verifiedAccessToken(token);
    return Boolean(userId);
  }
}
