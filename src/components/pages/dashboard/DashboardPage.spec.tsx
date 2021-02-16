import React from 'react';
import { render } from '@testing-library/react';
import { DashboardPage as Sut } from './DashboardPage';

describe('Dashboard page testes', () => {
  it('Should render correctly', () => {
    const { getByText } = render(<Sut />);
    expect(getByText(/Dashboard/i)).toBeInTheDocument();
  });
});
