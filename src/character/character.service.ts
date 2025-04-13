import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Character, CharacterDocument } from './character.entity';
import { CreateCharacterDto } from './dto/create-personagem.dto';
import { UpdateCharacterDto } from './dto/update-personagem.dto';
import { AddItemDto } from './dto/add-item.dto';
import { MagicItem, MagicItemType } from '../magic-item/magic-item.entity';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
    @InjectModel(MagicItem.name) private magicItemModel: Model<MagicItem>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const createdCharacter = new this.characterModel(createCharacterDto);
    return createdCharacter.save();
  }

  async findAll(): Promise<Character[]> {
    return this.characterModel.find().populate('magicItems').exec();
  }

  async findOne(id: string): Promise<Character> {
    const character = await this.characterModel
      .findById(id)
      .populate('magicItems')
      .exec();

    if (!character) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }
    return character;
  }

  async update(
    id: string,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    const existingCharacter = await this.characterModel
      .findByIdAndUpdate(id, updateCharacterDto, { new: true })
      .populate('magicItems')
      .exec();

    if (!existingCharacter) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }
    return existingCharacter;
  }

  async remove(id: string): Promise<void> {
    const result = await this.characterModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }
  }

  async addMagicItem(id: string, addItemDto: AddItemDto): Promise<Character> {
    const character = await this.characterModel.findById(id).exec();
    if (!character) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }

    const magicItem = await this.magicItemModel
      .findById(addItemDto.itemId)
      .exec();
    if (!magicItem) {
      throw new NotFoundException(
        `Magic item with ID ${addItemDto.itemId} not found`,
      );
    }

    if (magicItem.type === MagicItemType.AMULET) {
      const hasAmulet = character.magicItems.some((item) =>
        item instanceof Types.ObjectId
          ? false
          : item.type === MagicItemType.AMULET,
      );

      if (hasAmulet) {
        throw new BadRequestException('The character already has an amulet');
      }
    }

    await this.characterModel
      .findByIdAndUpdate(
        id,
        { $addToSet: { magicItems: new Types.ObjectId(addItemDto.itemId) } },
        { new: true },
      )
      .populate('magicItems')
      .exec();

    const updatedCharacter = await this.characterModel
      .findById(id)
      .populate('magicItems')
      .exec();

    if (!updatedCharacter) {
      throw new NotFoundException(
        `Character with ID ${id} not found after update`,
      );
    }

    return updatedCharacter;
  }

  async removeMagicItem(
    characterId: string,
    itemId: string,
  ): Promise<Character> {
    const character = await this.characterModel.findById(characterId).exec();
    if (!character) {
      throw new NotFoundException(`Character with ID ${characterId} not found`);
    }

    const itemIndex = character.magicItems.findIndex(
      (item) => item.toString() === itemId,
    );
    if (itemIndex === -1) {
      throw new NotFoundException(
        `Item with ID ${itemId} not found in character's inventory`,
      );
    }

    character.magicItems.splice(itemIndex, 1);
    await character.save();

    const updatedCharacter = await this.characterModel
      .findById(characterId)
      .populate('magicItems')
      .exec();

    if (!updatedCharacter) {
      throw new NotFoundException(
        `Character with ID ${characterId} not found after update`,
      );
    }
    return updatedCharacter;
  }

  async findCharacterAmulet(characterId: string): Promise<MagicItem | null> {
    const character = await this.characterModel
      .findById(characterId)
      .populate('magicItems')
      .exec();

    if (!character) {
      throw new NotFoundException(`Character with ID ${characterId} not found`);
    }

    const amulet = character.magicItems.find(
      (item) => item.type === MagicItemType.AMULET,
    );
    return amulet || null;
  }

  async findCharacterMagicItems(characterId: string): Promise<MagicItem[]> {
    const character = await this.characterModel
      .findById(characterId)
      .populate('magicItems')
      .exec();

    if (!character) {
      throw new NotFoundException(`Character with ID ${characterId} not found`);
    }
    return character.magicItems;
  }
}
