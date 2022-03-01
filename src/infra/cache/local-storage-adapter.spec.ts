import faker from 'faker'
import { LocalStorageAdpater } from './local-storage-adapter';
import 'jest-localstorage-mock'
import { AccountModel } from '@/domain/models';

const makeSut = (): LocalStorageAdpater => new LocalStorageAdpater()

describe('LocalStorageAdpater', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.objectElement<AccountModel>()

    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  });
});
