import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { render } from '@testing-library/react';
import { HistoryPage as Sut } from './HistoryPage';
import { ShoppingListHistoryContext } from './../../../contexts';
import { generateUuid } from '../../../helpers/uuid';
import userEvent from '@testing-library/user-event';

// Factory for makeing a shopping list history mock
const makeShoppingListHistoryMock = () => {
  return [
    {
      id: generateUuid(),
      date: new Date(),
      products: [
        {
          id: generateUuid(),
          label: 'Mock Product 1',
          quantity: 1,
          unityPrice: 0,
          totalPrice: 0,
        },
      ],
    },
    {
      id: generateUuid(),
      date: new Date(),
      products: [],
    },
    {
      id: generateUuid(),
      date: new Date(),
      products: [],
    },
  ];
};

// Jest fn() for history.push()
const mockHistoryPush = jest.fn();

// Mock react-router-dom useHistory push
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as typeof ReactRouterDom),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('History Page Test Suite', () => {
  it('Should render empty shopping list history with feedback', () => {
    const { getByText } = render(<Sut />);

    const titleLbl = getByText(/Ops, você ainda não criou nenhuma lista de compras/i);
    expect(titleLbl).toBeTruthy();
  });

  it('Should render shopping list history with title, date and quantity of products', () => {
    const shoppingListHistoryMock = makeShoppingListHistoryMock();
    const { getByTestId, getByText } = render(
      <ShoppingListHistoryContext.Provider
        value={{
          history: shoppingListHistoryMock,
          addShoppingList: jest.fn(),
        }}
      >
        <Sut />
      </ShoppingListHistoryContext.Provider>,
    );

    for (const shoppingList of shoppingListHistoryMock) {
      const titleLbl = getByText(/Histórico/i);
      expect(titleLbl).toBeTruthy();
      const shoppingListItem = getByTestId(shoppingList.id);
      expect(shoppingListItem).toBeTruthy();
      const dateLbl = new Date(shoppingList.date).toLocaleDateString();
      expect(shoppingListItem).toHaveTextContent(dateLbl);
      const productsQuantityLbl = `(${shoppingList.products.length} produtos)`;
      expect(shoppingListItem).toHaveTextContent(productsQuantityLbl);
    }
  });

  it('Should open a list after confirming and show the products on home', () => {
    const shoppingListHistoryMock = makeShoppingListHistoryMock();
    const { getByTestId } = render(
      <ReactRouterDom.MemoryRouter>
        <ShoppingListHistoryContext.Provider
          value={{
            history: shoppingListHistoryMock,
            addShoppingList: jest.fn(),
          }}
        >
          <Sut />
        </ShoppingListHistoryContext.Provider>
      </ReactRouterDom.MemoryRouter>,
    );

    const firstShoppingList = shoppingListHistoryMock[0];
    const openListBtn = getByTestId(`openList_${firstShoppingList.id}`);
    expect(openListBtn).toBeTruthy();
    if (openListBtn) {
      userEvent.click(openListBtn);
      expect(getByTestId('openOldListConfirm')).toBeInTheDocument();
      expect(getByTestId('confirmDialogButton')).toBeInTheDocument();
      userEvent.click(getByTestId('confirmDialogButton'));
      expect(mockHistoryPush).toHaveBeenCalledWith('/');
    }
  });

  it('Should not remove the last product after canceling the confirm dialog', () => {
    const shoppingListHistoryMock = makeShoppingListHistoryMock();
    const { getByTestId } = render(
      <ShoppingListHistoryContext.Provider
        value={{
          history: shoppingListHistoryMock,
          addShoppingList: jest.fn(),
        }}
      >
        <Sut />
      </ShoppingListHistoryContext.Provider>,
    );

    const firstShoppingList = shoppingListHistoryMock[0];
    const openListBtn = getByTestId(`openList_${firstShoppingList.id}`);
    expect(openListBtn).toBeTruthy();
    if (openListBtn) {
      userEvent.click(openListBtn);
      expect(getByTestId('openOldListConfirm')).toBeInTheDocument();
      expect(getByTestId('openOldListConfirmCancelBtn')).toBeInTheDocument();
      userEvent.click(getByTestId('openOldListConfirmCancelBtn'));

      for (const shoppingList of shoppingListHistoryMock) {
        const shoppingListItem = getByTestId(shoppingList.id);
        expect(shoppingListItem).toBeTruthy();
        const dateLbl = new Date(shoppingList.date).toLocaleDateString();
        expect(shoppingListItem).toHaveTextContent(dateLbl);
        const productsQuantityLbl = `(${shoppingList.products.length} produtos)`;
        expect(shoppingListItem).toHaveTextContent(productsQuantityLbl);
      }
    }
  });

  it('Should open products afte after clicking on shopping list with products', () => {
    const shoppingListHistoryMock = makeShoppingListHistoryMock();
    const { getByTestId } = render(
      <ShoppingListHistoryContext.Provider
        value={{
          history: shoppingListHistoryMock,
          addShoppingList: jest.fn(),
        }}
      >
        <Sut />
      </ShoppingListHistoryContext.Provider>,
    );

    const firstShoppingList = shoppingListHistoryMock[0];
    const openProductsFromListBtn = getByTestId(`${firstShoppingList.id}`);
    expect(openProductsFromListBtn).toBeTruthy();
    if (openProductsFromListBtn) {
      userEvent.click(openProductsFromListBtn);
      const shoppingListProductsDialog = getByTestId('shoppingListProductsDialog');
      expect(shoppingListProductsDialog).toBeInTheDocument();

      for (const product of firstShoppingList.products) {
        const productLabel = `${product.quantity}x ${product.label}`;
        expect(shoppingListProductsDialog).toHaveTextContent(productLabel);
      }

      expect(getByTestId('cancelDialogBtn')).toBeInTheDocument();
      userEvent.click(getByTestId('cancelDialogBtn'));
      for (const shoppingList of shoppingListHistoryMock) {
        const shoppingListItem = getByTestId(shoppingList.id);
        expect(shoppingListItem).toBeTruthy();
        const dateLbl = new Date(shoppingList.date).toLocaleDateString();
        expect(shoppingListItem).toHaveTextContent(dateLbl);
        const productsQuantityLbl = `(${shoppingList.products.length} produtos)`;
        expect(shoppingListItem).toHaveTextContent(productsQuantityLbl);
      }
    }
  });

  it('Should show feedback afte after clicking on shopping list without products', () => {
    const shoppingListHistoryMock = makeShoppingListHistoryMock();
    const { getByTestId, getByText } = render(
      <ShoppingListHistoryContext.Provider
        value={{
          history: shoppingListHistoryMock,
          addShoppingList: jest.fn(),
        }}
      >
        <Sut />
      </ShoppingListHistoryContext.Provider>,
    );

    const firstShoppingList = shoppingListHistoryMock[1];
    const openProductsFromListBtn = getByTestId(`${firstShoppingList.id}`);
    expect(openProductsFromListBtn).toBeTruthy();
    if (openProductsFromListBtn) {
      userEvent.click(openProductsFromListBtn);
      const shoppingListProductsDialog = getByTestId('shoppingListProductsDialog');
      expect(shoppingListProductsDialog).toBeInTheDocument();
      expect(shoppingListProductsDialog).toHaveTextContent('Não há produtos nesta lista');

      expect(getByTestId('cancelDialogBtn')).toBeInTheDocument();
      userEvent.click(getByTestId('cancelDialogBtn'));
      for (const shoppingList of shoppingListHistoryMock) {
        const shoppingListItem = getByTestId(shoppingList.id);
        expect(shoppingListItem).toBeTruthy();
        const dateLbl = new Date(shoppingList.date).toLocaleDateString();
        expect(shoppingListItem).toHaveTextContent(dateLbl);
        const productsQuantityLbl = `(${shoppingList.products.length} produtos)`;
        expect(shoppingListItem).toHaveTextContent(productsQuantityLbl);
      }
    }
  });
});
