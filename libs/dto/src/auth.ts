import { User } from '@prisma/client';
import { IsString, IsMobilePhone } from 'class-validator';

export interface Token {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  user: Omit<User, 'password'>;
}

export class LoginDto {
  @IsMobilePhone('zh-CN')
  phone: string;

  @IsString()
  password: string;
}

export class RegisterDto {
  @IsMobilePhone('zh-CN')
  phone: string;

  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}
