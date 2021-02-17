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

  it('Should list all products added to shopping list', () => {
    render(<Sut />);
    userEvent.type(screen.getByPlaceholderText('Digite um produto'), 'Mock product name');
    userEvent.click(screen.getByText('Add'));
    userEvent.type(screen.getByPlaceholderText('Digite um produto'), 'Mock product name 2');
    userEvent.click(screen.getByText('Add'));
    expect(screen.getAllByText(/product/i).length).toBe(2);
  });

  it('Should increase by 1 the quantity of a product after clicking on plus', () => {
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

  it('Should decrease by 1 the quantity of a product after clicking on minus', () => {
    const { getByTestId } = render(<Sut />);
    userEvent.type(screen.getByPlaceholderText('Digite um produto'), 'Mock product name');
    userEvent.click(screen.getByText('Add'));
    const increaseBtn = getByTestId('increaseButton');
    const decreaseBtn = getByTestId('decreaseButton');
    expect(increaseBtn).toBeTruthy();
    expect(decreaseBtn).toBeTruthy();
    if (increaseBtn && decreaseBtn) {
      userEvent.click(increaseBtn);
      const quantityLbl = getByTestId('quantity');
      expect(quantityLbl).toBeTruthy();
      expect(quantityLbl.innerHTML).toEqual('2');
      userEvent.click(decreaseBtn);
      expect(quantityLbl.innerHTML).toEqual('1');
    }
  });

  it('Should keep the quantity equals 1 after clicking on minus if its already 1', () => {
    const { getByTestId } = render(<Sut />);
    userEvent.type(screen.getByPlaceholderText('Digite um produto'), 'Mock product name');
    userEvent.click(screen.getByText('Add'));
    const decreaseBtn = getByTestId('decreaseButton');
    expect(decreaseBtn).toBeTruthy();
    if (decreaseBtn) {
      userEvent.click(decreaseBtn);
      const quantityLbl = getByTestId('quantity');
      expect(quantityLbl).toBeTruthy();
      expect(quantityLbl.innerHTML).toEqual('1');
    }
  });

  it('Should remove the last product after clicking on delete button and show empty list', () => {
    const { getByTestId, getByText } = render(<Sut />);
    expect(getByText(/Lista vazia/i)).toBeInTheDocument();
    userEvent.type(screen.getByPlaceholderText('Digite um produto'), 'mocked_product_name');
    userEvent.click(screen.getByText('Add'));
    expect(screen.getAllByText(/mocked_product_name/i).length).toBe(1);
    const removeProductBtn = getByTestId('btnRemoveProduct');
    expect(removeProductBtn).toBeTruthy();
    if (removeProductBtn) {
      userEvent.click(removeProductBtn);
      expect(getByText(/Lista vazia/i)).toBeInTheDocument();
    }
  });

  it('Should strike through after checking a product', () => {
    const { getByTestId } = render(<Sut />);
    userEvent.type(screen.getByPlaceholderText('Digite um produto'), 'Mock product name');
    userEvent.click(screen.getByText('Add'));
    const productCheckbox = getByTestId('productCheckbox').querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(productCheckbox).toBeTruthy();
    if (productCheckbox) {
      userEvent.click(productCheckbox);
      expect(productCheckbox.checked).toEqual(true);
      const productLbl = getByTestId('productLabel');
      expect(productLbl).toBeTruthy();
      if (productLbl) expect(productLbl.innerHTML.indexOf('<s>')).toBeGreaterThanOrEqual(0);
    }
  });
});
