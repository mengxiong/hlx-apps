import { CreateTextbookDto } from '@hlx/dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TextbookService {
  constructor(private prisma: PrismaService) {}

  create(createTextbookDto: CreateTextbookDto) {
    return this.prisma.textbook.create(createTextbookDto);
  }

  findAll() {
    return `This action returns all textbook`;
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
