import React, { useEffect, useState } from 'react'
import { LoadSurveyResult } from '@/domain/usecases'
import { Footer, Header, Loading, Error } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData } from '@/presentation/pages/survey-result/components'
import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const handleError = useErrorHandler((error: Error) => {
    setState(prevState => ({ ...prevState, error: error.message }))
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(prevState => ({ ...prevState, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  const reload = (): void => setState(prevState => ({ ...prevState, error: '', reload: !prevState.reload }))

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
