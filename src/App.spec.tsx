import React from 'react';
import { render, screen } from '@testing-library/react';
import Sut from './App';

describe('Loading component test suite', () => {
  it('Should lazy load first page', () => {
    render(<Sut />);
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });
});
