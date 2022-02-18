import React from 'react'
import { render } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/context/form/formContenxt'

describe('Input Component', () => {
  test('Should begin with readyOnly', () => {
    const { getByTestId } = render(
      <Context.Provider value={{ state: {} }}>
        <Input name="field" />
      </Context.Provider>
    )
    const input = getByTestId('field') as HTMLInputElement

    expect(input.readOnly).toBe(true)
  });
});
