import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MagicItem, MagicItemDocument } from './magic-item.entity';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';

@Injectable()
export class MagicItemsService {
  constructor(
    @InjectModel(MagicItem.name)
    private magicItemModel: Model<MagicItemDocument>,
  ) {}

  async create(createMagicItemDto: CreateMagicItemDto): Promise<MagicItem> {
    const createdItem = new this.magicItemModel(createMagicItemDto);
    return createdItem.save();
  }

  async findAll(): Promise<MagicItem[]> {
    return this.magicItemModel.find().exec();
  }

  async findOne(id: string): Promise<MagicItem> {
    const item = await this.magicItemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Magic item with ID ${id} not found`);
    }
    return item;
  }

  async remove(id: string): Promise<void> {
    const result = await this.magicItemModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Magic item with ID ${id} not found`);
    }
  }
}
