import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export const AuthDecorator = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const authToken = req.headers.authorization;
    const token = authToken?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('로그인이 안되었습니다.');
    }
    return token;
  },
);
