import React, { useContext } from 'react';

import Spinner from '@/presentation/components/spinner/spinner';
import Context from '@/presentation/context/form/formContenxt';
import Styles from './form-status-styles.scss';

const FormStatus: React.FC = () => {
  const { isLoading, mainError } = useContext(Context);

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && <span data-testid="main-error" className={Styles.error}>{mainError}</span>}
    </div>
  );
};

export default FormStatus;
