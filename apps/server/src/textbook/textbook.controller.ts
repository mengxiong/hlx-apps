import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TextbookService } from './textbook.service';
import { CreateTextbookDto } from './dto/create-textbook.dto';
import { UpdateTextbookDto } from './dto/update-textbook.dto';
import { Prisma } from '@prisma/client';

@Controller('textbook')
export class TextbookController {
  constructor(private readonly textbookService: TextbookService) {}

  @Post()
  create(@Body() createTextbookDto: Prisma.TextbookCreateArgs) {
    return this.textbookService.create(createTextbookDto);
  }

  @Get()
  findAll() {
    return this.textbookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.textbookService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTextbookDto: UpdateTextbookDto,
  ) {
    return this.textbookService.update(+id, updateTextbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textbookService.remove(+id);
  }
}
