import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CharactersService } from './character.service';
import { CreateCharacterDto } from './dto/create-personagem.dto';
import { UpdateCharacterDto } from './dto/update-personagem.dto';
import { AddItemDto } from './dto/add-item.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(id);
  }

  @Post(':id/items')
  addMagicItem(@Param('id') id: string, @Body() addItemDto: AddItemDto) {
    return this.charactersService.addMagicItem(id, addItemDto);
  }

  @Get(':id/items')
  findCharacterMagicItems(@Param('id') id: string) {
    return this.charactersService.findCharacterMagicItems(id);
  }

  @Delete(':characterId/items/:itemId')
  removeMagicItem(
    @Param('characterId') characterId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.charactersService.removeMagicItem(characterId, itemId);
  }

  @Get(':id/amulet')
  findCharacterAmulet(@Param('id') id: string) {
    return this.charactersService.findCharacterAmulet(id);
  }
}
