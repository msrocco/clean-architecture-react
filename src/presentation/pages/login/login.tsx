import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { Authentication } from '@/domain/usecases'
import {
  LoginHeader,
  Footer,
  currentAccountState
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { loginState, Input, SubmitButton, FormStatus } from '@/presentation/pages/login/components'

import Styles from './login-styles.scss'

type Props = {
  validation: Validation;
  authentication: Authentication;
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const history = useHistory()
  const resetLoginState = useResetRecoilState(loginState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const [state, setState] = useRecoilState(loginState)

  useEffect(() => {
    resetLoginState()
  }, [])

  useEffect(() => {
    validate('email')
  }, [state.email])

  useEffect(() => {
    validate('password')
  }, [state.password])

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }

    setState(prevState => ({ ...prevState, [`${field}Error`]: validation.validate(field, formData) }))
    setState(prevState => ({ ...prevState, isFormInvalid: !!prevState.emailError || !!prevState.passwordError }))
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) return

      setState(prevState => ({ ...prevState, isLoading: true }))

      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      setCurrentAccount(account)

      history.replace('/')
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />

      <form
        data-testid="form"
        className={Styles.form}
        onSubmit={handleSubmit}
      >
        <h2>Login</h2>

        <Input type="email" name="email" placeholder="Digite seu e-mail" />

        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
        />

        <SubmitButton text="Entrar" />

        <Link data-testid="signup-link" to="/signup" className={Styles.link}>
            Criar conta
        </Link>

        <FormStatus />
      </form>

      <Footer />
    </div>
  )
}

export default Login
