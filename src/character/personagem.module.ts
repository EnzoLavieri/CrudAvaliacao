import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersController } from './personagem.controller';
import { CharactersService } from './personagem.service';
import { Character, CharacterSchema } from './personagem.entity';
import { MagicItemsModule } from '../magic-item/magic-item.module';
import { MagicItem, MagicItemSchema } from 'src/magic-item/magic-item.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
      { name: MagicItem.name, schema: MagicItemSchema },
    ]),
    forwardRef(() => MagicItemsModule),
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
