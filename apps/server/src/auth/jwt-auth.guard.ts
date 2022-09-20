import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_SKIP_KEY } from './jwt-skip.decorator';
import type { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authSkip = this.reflector.getAllAndOverride<boolean>(AUTH_SKIP_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (authSkip) {
      return true;
    }
    return super.canActivate(context);
  }
}
