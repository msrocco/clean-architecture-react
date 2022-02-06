import { HttpPostClientSpy } from '../../test/mock-http-client';
import { RemoveAuthentication } from './remove-authentication';

type SutTypes = {
  sut: RemoveAuthentication,
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoveAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'other_url'
    const { sut, httpPostClientSpy } = makeSut(url)

    await sut.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});
