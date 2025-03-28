import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type Request } from 'express';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  },
);

/*
  ! Usage
  @Get()
  findAll(@Cookies('name') name: string) {}
*/
