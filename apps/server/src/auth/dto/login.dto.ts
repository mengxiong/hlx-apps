import { IsString, IsMobilePhone } from 'class-validator';

export class LoginDto {
  @IsMobilePhone('zh-CN')
  phone: string;

  @IsString()
  password: string;
}
