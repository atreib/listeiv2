import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DashboardPage } from './DashboardPage';
import { ShoppingListProvider } from './../../../contexts';

const mockProductName = 'Mock_product_name';

const Sut = () => (
  <ShoppingListProvider>
    <DashboardPage />
  </ShoppingListProvider>
);

describe('Dashboard page testes', () => {
  beforeEach(() => {
    localStorage.setItem('openedShoppingList', '');
  });

  it('Should render correctly', () => {
    const { getByText } = render(<Sut />);
    expect(getByText(/Lista de compras/i)).toBeInTheDocument();
  });

  it('Should start a empty shopping list after confirming to start new list', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<Sut />);
    userEvent.type(getByPlaceholderText('Digite um produto'), mockProductName);
    userEvent.click(getByText('Add'));
    expect(getByText(mockProductName)).toBeInTheDocument();
    const startNewListBtn = getByTestId('startNewListBtn');
    expect(startNewListBtn).toBeTruthy();
    if (startNewListBtn) {
      userEvent.click(startNewListBtn);
      expect(getByTestId('newListConfirm')).toBeInTheDocument();
      expect(getByTestId('confirmDialogButton')).toBeInTheDocument();
      userEvent.click(getByTestId('confirmDialogButton'));
      expect(getByText(/Lista vazia/i)).toBeInTheDocument();
      expect(getByTestId('totalPriceLbl')).toBeTruthy();
      expect(getByTestId('totalPriceLbl').innerHTML).toContain('R$ 0,00');
    }
  });

  it('Should not start a empty shopping list after cancelling the start new list', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<Sut />);
    userEvent.type(getByPlaceholderText('Digite um produto'), mockProductName);
    userEvent.click(getByText('Add'));
    expect(getByText(mockProductName)).toBeInTheDocument();
    const startNewListBtn = getByTestId('startNewListBtn');
    expect(startNewListBtn).toBeTruthy();
    if (startNewListBtn) {
      userEvent.click(startNewListBtn);
      expect(getByTestId('newListConfirm')).toBeInTheDocument();
      expect(getByTestId('cancelDialogBtn')).toBeInTheDocument();
      userEvent.click(getByTestId('cancelDialogBtn'));
      expect(getByText(/Mock product name/i)).toBeInTheDocument();
    }
  });

  it('Should add typed product on list after clicking on add', () => {
    const { getByPlaceholderText, getByText } = render(<Sut />);
    userEvent.type(getByPlaceholderText('Digite um produto'), mockProductName);
    userEvent.click(getByText('Add'));
    expect(getByText(mockProductName)).toBeInTheDocument();
  });

  it('Should show product name and product price with current info after adding a product', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<Sut />);
    userEvent.type(getByPlaceholderText('Digite um produto'), mockProductName);
    userEvent.click(getByText('Add'));
    expect(getByText(mockProductName)).toBeInTheDocument();
    expect(getByTestId(`priceLbl_${mockProductName}`)).toBeTruthy();
    expect(getByTestId(`priceLbl_${mockProductName}`).innerHTML).toContain('R$ 0,00');
  });

  it('Should list all products added to shopping list', () => {
    const { getAllByText, getByPlaceholderText, getByText } = render(<Sut />);
    userEvent.type(getByPlaceholderText('Digite um produto'), 'Mock product name');
    userEvent.click(getByText('Add'));
    userEvent.type(getByPlaceholderText('Digite um produto'), 'Mock product name 2');
    userEvent.click(getByText('Add'));
    expect(getAllByText(/product/i).length).toBe(2);
  });

  it('Should increase by 1 the quantity of a product after clicking on plus', () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(<Sut />);
    userEvent.type(getByPlaceholderText('Digite um produto'), mockProductName);
    userEvent.click(getByText('Add'));
    const increaseBtn = getByTestId(`increaseBtn_${mockProductName}`);
    expect(increaseBtn).toBeTruthy();
    if (increaseBtn) {
      userEvent.click(increaseBtn);
      const quantityLbl = getByTestId(`quantityLbl_${mockProductName}`);
      expect(quantityLbl).toBeTruthy();
      expect(quantityLbl.innerHTML).toEqual('2');
    }
  });

  it('Should decrease by 1 the quantity of a product after clicking on minus', () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(<Sut />);
    userEvent.type(getByPlaceholderText('Digite um produto'), mockProductName);
    userEvent.click(getByText('Add'));
    const increaseBtn = getByTestId(`increaseBtn_${mockProductName}`);
    const decreaseBtn = getByTestId(`decreaseBtn_${mockProductName}`);
    expect(increaseBtn).toBeTruthy();
    expect(decreaseBtn).toBeTruthy();
    if (increaseBtn && decreaseBtn) {
      userEvent.click(increaseBtn);
      const quantityLbl = getByTestId(`quantityLbl_${mockProductName}`);
      expect(quantityLbl).toBeTruthy();
      expect(quantityLbl.innerHTML).toEqual('2');
      userEvent.click(decreaseBtn);
      expect(quantityLbl.innerHTML).toEqual('1');
    }
  });

  it('Should keep the quantity equals 1 after clicking on minus if its already 1', () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(<Sut />);
    userEvent.type(getByPlaceholderText('Digite um produto'), mockProductName);
    userEvent.click(getByText('Add'));
    const decreaseBtn = getByTestId(`decreaseBtn_${mockProductName}`);
    expect(decreaseBtn).toBeTruthy();
    if (decreaseBtn) {
      userEvent.click(decreaseBtn);
      const quantityLbl = getByTestId(`quantityLbl_${mockProductName}`);
      expect(quantityLbl).toBeTruthy();
      expect(quantityLbl.innerHTML).toEqual('1');
    }
  });

  it('Should remove the last product after removing and confirming then show empty list', () => {
    const { getByTestId, getByText, getByPlaceholderText, getAllByText } = render(<Sut />);
    expect(getByText(/Lista vazia/i)).toBeInTheDocument();
    userEvent.type(getByPlaceholderText('Digite um produto'), mockProductName);
    userEvent.click(getByText('Add'));
    expect(getAllByText(mockProductName).length).toBe(1);
    const removeProductBtn = getByTestId(`removeProductBtn_${mockProductName}`);
    expect(removeProductBtn).toBeTruthy();
    if (removeProductBtn) {
      userEvent.click(removeProductBtn);
      expect(getByTestId('removalConfirm')).toBeInTheDocument();
      expect(getByTestId('confirmDialogButton')).toBeInTheDocument();
      userEvent.click(getByTestId('confirmDialogButton'));
      expect(getByText(/Lista vazia/i)).toBeInTheDocument();
    }
  });

  it('Should not remove the last product after canceling the confirm dialog', () => {
    const { getByTestId, getByText, getAllByText, getByPlaceholderText } = render(<Sut />);
    expect(getByText(/Lista vazia/i)).toBeInTheDocument();
    userEvent.type(getByPlaceholderText('Digite um produto'), mockProductName);
    userEvent.click(getByText('Add'));
    expect(getAllByText(mockProductName).length).toBe(1);
    const removeProductBtn = getByTestId(`removeProductBtn_${mockProductName}`);
    expect(removeProductBtn).toBeTruthy();
    if (removeProductBtn) {
      userEvent.click(removeProductBtn);
      expect(getByTestId('removalConfirm')).toBeInTheDocument();
      expect(getByTestId('cancelDialogBtn')).toBeInTheDocument();
      userEvent.click(getByTestId('cancelDialogBtn'));
      expect(getAllByText(mockProductName).length).toBe(1);
    }
  });

  it('Should strike through after checking a product', () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(<Sut />);
    userEvent.type(getByPlaceholderText('Digite um produto'), mockProductName);
    userEvent.click(getByText('Add'));
    const productCheckbox = getByTestId(`productCheckbox_${mockProductName}`).querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(productCheckbox).toBeTruthy();
    if (productCheckbox) {
      userEvent.click(productCheckbox);
      expect(productCheckbox.checked).toEqual(true);
      const productLbl = getByTestId(`productLbl_${mockProductName}`);
      expect(productLbl).toBeTruthy();
      if (productLbl) expect(productLbl.innerHTML.indexOf('<s>')).toBeGreaterThanOrEqual(0);
    }
  });

  it('Should open price prompt after checking a product', () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(<Sut />);
    userEvent.type(getByPlaceholderText('Digite um produto'), mockProductName);
    userEvent.click(getByText('Add'));
    const productCheckbox = getByTestId(`productCheckbox_${mockProductName}`).querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    if (productCheckbox) {
      userEvent.click(productCheckbox);
      expect(getByTestId('pricePrompt')).toBeTruthy();
      expect(getByText('Adicionar preço ao produto')).toBeTruthy();
    }
  });

  it('Should keep same price after cancelling price prompt', () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(<Sut />);
    userEvent.type(getByPlaceholderText('Digite um produto'), mockProductName);
    userEvent.click(getByText('Add'));
    const productCheckbox = getByTestId(`productCheckbox_${mockProductName}`).querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    if (productCheckbox) {
      userEvent.click(productCheckbox);
      expect(getByTestId('priceInput')).toBeTruthy();
      expect(getByTestId('cancelDialogBtn')).toBeTruthy();
      userEvent.type(getByTestId('priceInput'), '2');
      userEvent.click(getByTestId('cancelDialogBtn'));
      expect(getByTestId(`priceLbl_${mockProductName}`)).toBeTruthy();
      expect(getByTestId(`priceLbl_${mockProductName}`).innerHTML).toContain('R$ 0,00');
      expect(getByTestId('totalPriceLbl')).toBeTruthy();
      expect(getByTestId('totalPriceLbl').innerHTML).toContain('R$ 0,00');
    }
  });

  it('Should update price after confirming price prompt', () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(<Sut />);
    userEvent.type(getByPlaceholderText('Digite um produto'), mockProductName);
    userEvent.click(getByText('Add'));
    const productCheckbox = getByTestId(`productCheckbox_${mockProductName}`).querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    if (productCheckbox) {
      userEvent.click(productCheckbox);
      const priceInput = getByTestId('priceInput').querySelector('input') as HTMLInputElement;
      userEvent.type(priceInput, '2');
      expect(getByTestId('confirmPromptButton')).toBeTruthy();
      userEvent.click(getByTestId('confirmPromptButton'));
      expect(getByTestId(`priceLbl_${mockProductName}`)).toBeTruthy();
      expect(getByTestId(`priceLbl_${mockProductName}`).innerHTML).toContain('R$ 2,00');
      expect(getByTestId('totalPriceLbl')).toBeTruthy();
      expect(getByTestId('totalPriceLbl').innerHTML).toContain('R$ 2,00');
    }
  });

  it('Should add product, set price, increase by 1 the quantity and update total price', () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(<Sut />);
    userEvent.type(getByPlaceholderText('Digite um produto'), mockProductName);
    userEvent.click(getByText('Add'));
    const productCheckbox = getByTestId(`productCheckbox_${mockProductName}`).querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    if (productCheckbox) {
      userEvent.click(productCheckbox);
      const priceInput = getByTestId('priceInput').querySelector('input') as HTMLInputElement;
      userEvent.type(priceInput, '2');
      userEvent.click(getByTestId('confirmPromptButton'));
      const increaseBtn = getByTestId(`increaseBtn_${mockProductName}`);
      if (increaseBtn) {
        userEvent.click(increaseBtn);
        expect(getByTestId(`priceLbl_${mockProductName}`)).toBeTruthy();
        expect(getByTestId(`priceLbl_${mockProductName}`).innerHTML).toContain('R$ 2,00');
        expect(getByTestId('totalPriceLbl')).toBeTruthy();
        expect(getByTestId('totalPriceLbl').innerHTML).toContain('R$ 4,00');
      }
    }
  });

  it('Should add two products, set price for both and update total price', () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(<Sut />);

    userEvent.type(getByPlaceholderText('Digite um produto'), 'Mock_product_1');
    userEvent.click(getByText('Add'));
    const product1Checkbox = getByTestId('productCheckbox_Mock_product_1') as HTMLInputElement;
    if (product1Checkbox) {
      userEvent.click(product1Checkbox);
      const priceInput = getByTestId('priceInput').querySelector('input') as HTMLInputElement;
      userEvent.type(priceInput, '2');
      userEvent.click(getByTestId('confirmPromptButton'));
    }

    userEvent.type(getByPlaceholderText('Digite um produto'), 'Mock_product_2');
    userEvent.click(getByText('Add'));
    const product2Checkbox = getByTestId('productCheckbox_Mock_product_2') as HTMLInputElement;
    if (product2Checkbox) {
      userEvent.click(product2Checkbox);
      const priceInput = getByTestId('priceInput').querySelector('input') as HTMLInputElement;
      userEvent.type(priceInput, '3');
      userEvent.click(getByTestId('confirmPromptButton'));
    }

    expect(getByTestId('totalPriceLbl').innerHTML).toContain('R$ 5,00');
  });
});
