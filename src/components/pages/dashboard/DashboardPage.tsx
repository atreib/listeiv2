import React, { useState } from 'react';
import { ShoppingList, ListTitle, NewProduct, List, Product, AppInput, AppButton } from './DashboardPage.styles';

const __mock_product__ = {
  label: 'Iogurte',
  quantity: 2,
  unityPrice: 12.5,
  totalPrice: 25.0,
};

const __mock_list__ = [__mock_product__, __mock_product__, __mock_product__];

export const DashboardPage = () => {
  const [shoppingList, setShoppingList] = useState(__mock_list__);
  const [newProduct, setNewProduct] = useState<string>();

  const onAddNewProduct = () => {
    if (newProduct) {
      setShoppingList([
        ...shoppingList,
        {
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
      <div>
        <List>{shoppingList && shoppingList.map((product, i) => <Product productName={product.label} key={i} />)}</List>
      </div>
      <NewProduct>
        <AppInput label="Novo produto" placeholder="Digite um produto" value={newProduct} setValue={setNewProduct} />
        <AppButton onClick={onAddNewProduct}>Add</AppButton>
      </NewProduct>
    </ShoppingList>
  );
};

export default DashboardPage;
