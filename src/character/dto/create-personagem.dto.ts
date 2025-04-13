import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  Validate,
} from 'class-validator';
import { CharacterClass } from '../character.entity';
import { StrengthDefenseSumValidator } from '../../shared/utils';

export class CreateCharacterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  adventurerName: string;

  @IsNotEmpty()
  @IsEnum(Object.values(CharacterClass))
  class: string;

  @IsInt()
  @Min(1)
  level: number = 1;

  @IsInt()
  @Min(0)
  @Max(10)
  strength: number;

  @IsInt()
  @Min(0)
  @Max(10)
  @Validate(StrengthDefenseSumValidator)
  defense: number;
}
