import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MagicItemDocument = MagicItem & Document;

export enum MagicItemType {
  WEAPON = 'Weapon',
  ARMOR = 'Armor',
  AMULET = 'Amulet',
}

@Schema()
export class MagicItem {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: Object.values(MagicItemType) })
  type: MagicItemType;

  @Prop({ required: true, min: 0, max: 10 })
  strength: number;

  @Prop({ required: true, min: 0, max: 10 })
  defense: number;
}

export const MagicItemSchema = SchemaFactory.createForClass(MagicItem);

MagicItemSchema.pre<MagicItem>('validate', function (next) {
  if (this.type === MagicItemType.WEAPON && this.defense !== 0) {
    this.defense = 0;
  }

  if (this.type === MagicItemType.ARMOR && this.strength !== 0) {
    this.strength = 0;
  }

  if (this.strength === 0 && this.defense === 0) {
    throw new Error('The magic item cannot have zero strength and defense');
  }
  next();
});
