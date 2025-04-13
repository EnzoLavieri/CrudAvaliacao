import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { MagicItemType } from '../magic-item.entity';

export class CreateMagicItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(Object.values(MagicItemType))
  type: string;

  @IsInt()
  @Min(0)
  @Max(10)
  strength: number;

  @IsInt()
  @Min(0)
  @Max(10)
  defense: number;
}
