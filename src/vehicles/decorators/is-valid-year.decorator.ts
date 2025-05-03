import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsValidYearLength(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidYearLength',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const stringValue = String(value);
          return stringValue.length === 2 || stringValue.length === 4;
        },
        defaultMessage() {
          return 'Year must have exactly 2 or 4 digits';
        },
      },
    });
  };
}
