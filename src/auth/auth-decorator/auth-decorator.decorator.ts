import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Session } from 'express-session';

export const AuthDecorator = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const { uid } = req.session as Session & { uid: string };
    return uid;
  },
);
