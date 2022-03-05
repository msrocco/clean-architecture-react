import faker from 'faker'
import { AddAccount } from '@/domain/usecases';
import { mockAccountModel } from '@/domain/test'

export const mockAddAcountParams = (): AddAccount.Params => {
  const password = faker.internet.password()

  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

export const mockAddAcountModel = (): AddAccount.Model => mockAccountModel()

export class AddAccountSpy implements AddAccount {
  account = mockAddAcountModel()
  params: AddAccount.Params
  callsCount = 0

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params
    this.callsCount++
    return this.account
  }
}
