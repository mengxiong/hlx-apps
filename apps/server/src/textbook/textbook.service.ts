import { CreateTextbookDto, FindAllTextbookDto } from '@hlx/dto';
import { Injectable } from '@nestjs/common';
import { pick } from 'lodash';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TextbookService {
  constructor(private prisma: PrismaService) {}

  create(createTextbookDto: CreateTextbookDto) {
    return this.prisma.textbook.create(createTextbookDto);
  }

  async findAll(params: FindAllTextbookDto) {
    const total = await this.prisma.textbook.count(pick(params, 'where'));
    const data = await this.prisma.textbook.findMany(params);
    return { data, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} textbook`;
  }

  update(id: number, updateTextbookDto: any) {
    return `This action updates a #${id} textbook`;
  }

  remove(id: number) {
    return `This action removes a #${id} textbook`;
  }
}
