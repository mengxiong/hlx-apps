import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { omit } from 'lodash';
import { Token } from '@hlx/dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export interface JwtPayload {
  id: number;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private userService: UserService
  ) {}

  public async register({ phone, password }: RegisterDto) {
    const existUser = await this.userService.findByPhone(phone);
    if (existUser) {
      throw new BadRequestException('手机号已注册');
    }
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const user = await this.userService.create({
      phone,
      password: encryptedPassword,
    });
    return this.generateToken(user);
  }

  public async login({ phone, password }: LoginDto) {
    const user = await this.userService.findByPhone(phone);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('密码错误');
    }
    return this.generateToken(user);
  }

  public async refreshToken(token: string) {
    try {
      const { id } = this.jwtService.verify(token);
      const user = await this.userService.findById(id);
      const accessToken = this.generateAccessToken(user);
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private generateAccessToken(user: User) {
    const payload: JwtPayload = { id: user.id };
    return this.jwtService.sign(payload, {
      expiresIn: this.config.get('ACCESS_TOKEN_EXPIRES_IN'),
    });
  }

  private generateRefreshToken(user: User) {
    const payload: JwtPayload = { id: user.id };
    return this.jwtService.sign(payload, {
      expiresIn: this.config.get('REFRESH_TOKEN_EXPIRES_IN'),
    });
  }

  private generateToken(user: User): Token {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      user: omit(user, 'password'),
    };
  }
}
