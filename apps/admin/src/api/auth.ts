import { Token, LoginDto } from '@hlx/dto';
import { request } from '../request';

export function login(params: LoginDto) {
  return request.post<any, Token>('/auth/login', params);
}
