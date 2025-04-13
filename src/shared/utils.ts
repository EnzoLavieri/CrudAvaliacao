import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'strengthDefenseSum', async: false })
export class StrengthDefenseSumValidator
  implements ValidatorConstraintInterface
{
  validate(value: number, args: ValidationArguments) {
    const object = args.object as any;
    return object.strength + value === 10;
  }

  defaultMessage(args: ValidationArguments) {
    return 'A soma de força e defesa deve ser exatamente 10';
  }
}
