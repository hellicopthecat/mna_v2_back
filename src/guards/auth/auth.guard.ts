import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = ctx.switchToHttp().getRequest();
    const authToken = req.headers.authorization;
    const token = authToken?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('로그인이 안되었습니다...');
    }

    return Boolean(token);
  }
}
