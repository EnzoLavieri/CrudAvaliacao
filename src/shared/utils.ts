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
    return 'The sum of strength and defense must be exactly 10';
  }
}
