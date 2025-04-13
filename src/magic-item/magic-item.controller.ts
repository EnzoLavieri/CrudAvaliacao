import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MagicItemsService } from './magic-item.service';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';

@Controller('magic-items')
export class MagicItemsController {
  constructor(private readonly magicItemsService: MagicItemsService) {}

  @Post()
  create(@Body() createMagicItemDto: CreateMagicItemDto) {
    return this.magicItemsService.create(createMagicItemDto);
  }

  @Get()
  findAll() {
    return this.magicItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.magicItemsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.magicItemsService.remove(id);
  }
}
