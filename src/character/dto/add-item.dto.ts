import { IsNotEmpty, IsString } from 'class-validator';

export class AddItemDto {
  @IsNotEmpty()
  @IsString()
  itemId: string;
}
