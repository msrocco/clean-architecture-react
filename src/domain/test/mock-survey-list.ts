import faker from 'faker'
import { SurveyModel } from '@/domain/models';

export const mockSurveyList = (): SurveyModel[] => ([{
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  answers: [
    {
      answer: faker.random.words(5),
      image: faker.internet.url()
    },
    {
      answer: faker.random.words(5)
    }
  ],
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent()
}])