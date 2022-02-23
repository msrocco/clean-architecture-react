import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';
import { AccountModel } from '@/domain/models';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';
import { AddAccount, AddAccountParams, AuthenticationParams } from '@/domain/usecases';

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}