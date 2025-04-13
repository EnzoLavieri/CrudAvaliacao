import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MagicItemDocument = MagicItem & Document;

export enum MagicItemType {
  ARMA = 'Arma',
  ARMADURA = 'Armadura',
  AMULETO = 'Amuleto',
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
  if (this.type === MagicItemType.ARMA && this.defense !== 0) {
    this.defense = 0;
  }

  if (this.type === MagicItemType.ARMADURA && this.strength !== 0) {
    this.strength = 0;
  }

  if (this.strength === 0 && this.defense === 0) {
    throw new Error('O item mágico não pode ter força e defesa zerados');
  }

  next();
});
