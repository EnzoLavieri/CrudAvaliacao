import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCharacterDto {
  @IsNotEmpty()
  @IsString()
  adventurerName: string;
}
