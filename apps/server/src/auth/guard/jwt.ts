import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import type { Observable } from 'rxjs';

const AUTH_SKIP_KEY = 'jwtAuthSkip';

export const AuthSkip = () => SetMetadata(AUTH_SKIP_KEY, true);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
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
