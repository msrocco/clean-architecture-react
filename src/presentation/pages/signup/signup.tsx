import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { Link, useHistory } from 'react-router-dom'
import { AddAccount } from '@/domain/usecases'
import {
  LoginHeader,
  Footer,
  currentAccountState
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { signUpState, Input, SubmitButton, FormStatus } from '@/presentation/pages/signup/components'

import Styles from './signup-styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const history = useHistory()
  const resetSignUpState = useResetRecoilState(signUpState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const [state, setState] = useRecoilState(signUpState)

  useEffect(() => {
    resetSignUpState()
  }, [])

  useEffect(() => {
    validate('name')
  }, [state.name])

  useEffect(() => {
    validate('email')
  }, [state.email])

  useEffect(() => {
    validate('password')
  }, [state.password])

  useEffect(() => {
    validate('passwordConfirmation')
  }, [state.passwordConfirmation])

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }

    setState(prevState => ({ ...prevState, [`${field}Error`]: validation.validate(field, formData) }))
    setState(prevState => ({ ...prevState, isFormInvalid: !!prevState.nameError || !!prevState.emailError || !!prevState.passwordError || !!prevState.passwordConfirmationError }))
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) return

      setState(prevState => ({ ...prevState, isLoading: true }))

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
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
    <div className={Styles.signupWrap}>
      <LoginHeader />

      <form
        data-testid="form"
        className={Styles.form}
        onSubmit={handleSubmit}
      >
        <h2>Criar Conta</h2>

        <Input type="text" name="name" placeholder="Digite seu nome" />
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />

        <SubmitButton text="Cadastrar" />

        <Link data-testid="login-link" replace to="/login" className={Styles.link}>
          Voltar Para Login
        </Link>

        <FormStatus />
      </form>

      <Footer />
    </div>
  )
}

export default SignUp
