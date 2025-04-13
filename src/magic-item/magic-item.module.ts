import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MagicItemsController } from './magic-item.controller';
import { MagicItemsService } from './magic-item.service';
import { MagicItem, MagicItemSchema } from './magic-item.entity';
import { CharactersModule } from '../character/character.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MagicItem.name, schema: MagicItemSchema },
    ]),
    forwardRef(() => CharactersModule),
  ],
  controllers: [MagicItemsController],
  providers: [MagicItemsService],
  exports: [MagicItemsService],
})
export class MagicItemsModule {}
