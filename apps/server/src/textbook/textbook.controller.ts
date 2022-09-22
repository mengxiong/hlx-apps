import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTextbookDto } from '@hlx/dto';
import { TextbookService } from './textbook.service';
import { Roles } from '../auth/guard/roles';

@Controller('textbook')
export class TextbookController {
  constructor(private readonly textbookService: TextbookService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createTextbookDto: CreateTextbookDto) {
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
  update(@Param('id') id: string, @Body() updateTextbookDto: any) {
    return this.textbookService.update(+id, updateTextbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textbookService.remove(+id);
  }
}
