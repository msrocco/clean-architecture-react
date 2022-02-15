import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors';
import { EmailValidation } from '@/validation/validators/email/email-validation';

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.words())
    expect(error).toEqual(new InvalidFieldError())
  });

  test('Should return falsy if email valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  });

  test('Should return falsy if email is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toBeFalsy()
  });
});
