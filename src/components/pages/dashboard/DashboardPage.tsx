import React from 'react';
import { ShoppingList, ListTitle, NewProduct, List, Product } from './DashboardPage.styles';

export const DashboardPage = () => {
  const __mock_product__ = {
    label: 'Iogurte',
    quantity: 2,
    unityPrice: 12.5,
    totalPrice: 25.0,
  };

  const __mock_list__ = [__mock_product__, __mock_product__];

  return (
    <ShoppingList>
      <ListTitle>Lista de compras</ListTitle>
      <div>
        <List>{__mock_list__ && __mock_list__.map((product, i) => <Product key={i}>{product.label}</Product>)}</List>
      </div>
      <NewProduct>New item</NewProduct>
    </ShoppingList>
  );
};

export default DashboardPage;
