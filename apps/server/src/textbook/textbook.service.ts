import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateTextbookDto } from './dto/update-textbook.dto';

@Injectable()
export class TextbookService {
  constructor(private prisma: PrismaService) {}
  create(createTextbookDto: Prisma.TextbookCreateArgs) {
    return this.prisma.textbook.create(createTextbookDto);
  }

  findAll() {
    return `This action returns all textbook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} textbook`;
  }

  update(id: number, updateTextbookDto: UpdateTextbookDto) {
    return `This action updates a #${id} textbook`;
  }

  remove(id: number) {
    return `This action removes a #${id} textbook`;
  }
}
