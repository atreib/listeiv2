import React, { useState } from 'react';
import {
  ShoppingList,
  ListTitle,
  NewProduct,
  ListWrapper,
  Product,
  AppInput,
  AppButton,
  AppList,
} from './DashboardPage.styles';
import { ProductModel, ShoppingListModel } from './../../../models';

const __mock_product__: ProductModel = {
  id: '0000-0000-0000-00000000-0000',
  label: 'Iogurte',
  quantity: 2,
  unityPrice: 12.5,
  totalPrice: 25.0,
};

const __mock_list__: ShoppingListModel = {
  id: '0000',
  products: [__mock_product__],
};

export const DashboardPage = () => {
  const [shoppingList, setShoppingList] = useState(__mock_list__.products);
  const [newProduct, setNewProduct] = useState<string>();

  const onAddNewProduct = () => {
    if (newProduct) {
      setShoppingList([
        ...shoppingList,
        {
          id: '00000',
          label: newProduct,
          quantity: 1,
          unityPrice: 0.0,
          totalPrice: 0.0,
        },
      ]);
    }
  };

  return (
    <ShoppingList>
      <ListTitle>Lista de compras</ListTitle>
      <ListWrapper>
        <AppList>
          {shoppingList && shoppingList.map((product) => <Product product={product} key={product.id} />)}
        </AppList>
      </ListWrapper>
      <NewProduct>
        <AppInput label="Novo produto" placeholder="Digite um produto" value={newProduct} setValue={setNewProduct} />
        <AppButton onClick={onAddNewProduct}>Add</AppButton>
      </NewProduct>
    </ShoppingList>
  );
};

export default DashboardPage;
