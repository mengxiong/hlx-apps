import { IsString, IsMobilePhone } from 'class-validator';

export class RegisterDto {
  @IsMobilePhone('zh-CN')
  phone: string;

  @IsString()
  password: string;
}
