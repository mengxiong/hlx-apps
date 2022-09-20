import { SetMetadata } from '@nestjs/common';

export const AUTH_SKIP_KEY = 'jwtAuthSkip';

export const AuthSkip = () => SetMetadata(AUTH_SKIP_KEY, true);
