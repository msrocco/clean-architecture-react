import React, { memo } from 'react';

import Logo from '@/presentation/components/logo/logo';

import Styles from './login-header-styles.scss'

const LoginHeader: React.FC = () => {
  return (
    <div className={Styles.header}>
      <Logo />
      <h1>4Dev - Enquete para Programadores</h1>
    </div>
  );
};

export default memo(LoginHeader);
