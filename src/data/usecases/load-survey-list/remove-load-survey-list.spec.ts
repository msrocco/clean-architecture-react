import faker from 'faker'
import { HttpGetClientSpy } from '@/data/test';
import { RemoveLoadSurveyList } from './remove-load-survey-list';

type SutTypes = {
  sut: RemoveLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoveLoadSurveyList(url, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoveLoadSurveyList', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  });
});
