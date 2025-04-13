import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { MagicItem } from '../magic-item/magic-item.entity';

export type CharacterDocument = Character & Document;

export enum CharacterClass {
  GUERREIRO = 'Guerreiro',
  MAGO = 'Mago',
  ARQUEIRO = 'Arqueiro',
  LADINO = 'Ladino',
  BARDO = 'Bardo',
}

@Schema()
export class Character {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  adventurerName: string;

  @Prop({ required: true, enum: Object.values(CharacterClass) })
  class: CharacterClass;

  @Prop({ required: true, default: 1 })
  level: number;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'MagicItem' }] })
  magicItems: MagicItem[];

  @Prop({ required: true, min: 0, max: 10 })
  strength: number;

  @Prop({ required: true, min: 0, max: 10 })
  defense: number;

  totalStrength?: number;
  totalDefense?: number;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);

CharacterSchema.virtual('totalStrength').get(function () {
  const itemsStrength = this.magicItems.reduce(
    (sum, item) => sum + (item.strength || 0),
    0,
  );
  return this.strength + itemsStrength;
});

CharacterSchema.virtual('totalDefense').get(function () {
  const itemsDefense = this.magicItems.reduce(
    (sum, item) => sum + (item.defense || 0),
    0,
  );
  return this.defense + itemsDefense;
});

CharacterSchema.set('toJSON', { virtuals: true });
CharacterSchema.set('toObject', { virtuals: true });
