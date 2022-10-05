import { request } from '../request';

export class RestApi<CreateBody = any> {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  create = (body: CreateBody) => {
    return request.post(this.path, body);
  };

  findAll = () => {
    return request.get(this.path);
  };

  findOne = (id: string | number) => {
    return request.get(`/${this.path}/${id}`);
  };

  update = (id: string | number, body) => {
    return request.patch(`/${this.path}/${id}`, body);
  };

  remove = (id: string | number) => {
    return request.delete(`/${this.path}/${id}`);
  };
}
