import React, { useState } from 'react'

import { LoginHeader, Input, Footer, FormStatus } from '@/presentation/components'
import Context from '@/presentation/context/form/formContenxt'

import Styles from './login-styles.scss'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <Context.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu e-mail" />

          <Input type="password" name="password" placeholder="Digite sua senha" />

          <button className={Styles.submit} type="submit">Entrar</button>

          <span className={Styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Login
