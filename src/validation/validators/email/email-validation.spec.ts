import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors';
import { EmailValidation } from '@/validation/validators/email/email-validation';

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.random.words())
    const error = sut.validate(faker.random.words())
    expect(error).toEqual(new InvalidFieldError())
  });

  test('Should return falsy if email valid', () => {
    const sut = new EmailValidation(faker.random.words())
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  });
});
