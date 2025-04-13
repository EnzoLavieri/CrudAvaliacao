import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersModule } from './character/character.module';
import { MagicItemsModule } from './magic-item/magic-item.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/RPGGerenciator'),
    CharactersModule,
    MagicItemsModule,
  ],
})
export class AppModule {}
