import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DashboardPage as Sut } from './DashboardPage';

describe('Dashboard page testes', () => {
  it('Should render correctly', () => {
    const { getByText } = render(<Sut />);
    expect(getByText(/Lista de compras/i)).toBeInTheDocument();
  });

  it('Should add typed product on list after clicking on add', () => {
    render(<Sut />);
    userEvent.type(screen.getByPlaceholderText('Digite um produto'), 'Mock product name');
    userEvent.click(screen.getByText('Add'));
    expect(screen.getByText(/Mock product name/i)).toBeInTheDocument();
  });

  it('Should increase quantity of a product after clicking on plus', () => {
    const { getByTestId } = render(<Sut />);
    userEvent.type(screen.getByPlaceholderText('Digite um produto'), 'Mock product name');
    userEvent.click(screen.getByText('Add'));
    const increaseBtn = getByTestId('increaseButton');
    expect(increaseBtn).toBeTruthy();
    if (increaseBtn) {
      userEvent.click(increaseBtn);
      const quantityLbl = getByTestId('quantity');
      expect(quantityLbl).toBeTruthy();
      expect(quantityLbl.innerHTML).toEqual('2');
    }
  });
});
