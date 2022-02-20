import faker from 'faker'
import { LocalStorageAdpater } from './local-storage-adapter';
import 'jest-localstorage-mock'

const makeSut = (): LocalStorageAdpater => new LocalStorageAdpater()

describe('LocalStorageAdpater', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.words()

    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  });
});
