import React, { useContext, useRef } from 'react';

import Context from '@/presentation/context/form/formContenxt';

import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>()
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`];

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        ref={inputRef}
        title={error}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={e => { e.target.readOnly = false }}
        onChange={handleChange}
      />
      <label
        data-testid={`${props.name}-label`}
        onClick={() => { inputRef.current.focus() }}
        title={error}
      >
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;
