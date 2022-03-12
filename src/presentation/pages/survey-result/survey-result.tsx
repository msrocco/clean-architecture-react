import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { Footer, Header, Loading, Error } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData, surveyResultState, onSurveyAnswerState } from '@/presentation/pages/survey-result/components'
import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const [state, setState] = useRecoilState(surveyResultState)
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)
  const handleError = useErrorHandler((error: Error) => {
    setState(prevState => ({ ...prevState, surveyResult: null, isLoading: false, error: error.message }))
  })

  useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [])

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(prevState => ({ ...prevState, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  const reload = (): void => setState(prevState => ({ ...prevState, error: '', reload: !prevState.reload }))

  const onAnswer = (answer: string): void => {
    if (state.isLoading) return

    setState(prevState => ({ ...prevState, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then(surveyResult => setState(prevState => ({ ...prevState, isLoading: false, surveyResult })))
      .catch(handleError)
  }

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
