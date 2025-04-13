import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersModule } from './character/personagem.module';
import { MagicItemsModule } from './magic-item/magic-item.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/GerenciadorRPG'),
    CharactersModule,
    MagicItemsModule,
  ],
})
export class AppModule {}
