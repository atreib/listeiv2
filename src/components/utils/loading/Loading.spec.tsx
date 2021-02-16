import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loading as Sut } from './Loading';

describe('Loading component test suite', () => {
  it('Should correctly render empty component', () => {
    const content = 'Teste';
    const children = <b>{content}</b>;
    const { getByText } = render(<Sut>{children}</Sut>);
    expect(getByText(/Teste/i)).toBeInTheDocument();
  });

  it('Should correctly add style through provided props', () => {
    const content = 'Teste';
    const children = <b>{content}</b>;
    const { getByTestId } = render(
      <Sut width="100px" height="100px" backgroundColor="red">
        {children}
      </Sut>,
    );
    const sut = getByTestId('loadingwrapper');
    expect(sut).toHaveStyle('width: 100px');
    expect(sut).toHaveStyle('height: 100px');
    expect(sut).toHaveStyle('background-color: red');
  });
});
