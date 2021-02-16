import React, { useState } from 'react';
import { ShoppingList, ListTitle, NewProduct, List, Product, AppInput } from './DashboardPage.styles';

export const DashboardPage = () => {
  const __mock_product__ = {
    label: 'Iogurte',
    quantity: 2,
    unityPrice: 12.5,
    totalPrice: 25.0,
  };

  const __mock_list__ = [__mock_product__, __mock_product__];

  const [novoProduto, setNovoProduto] = useState<string>();

  return (
    <ShoppingList>
      <ListTitle>Lista de compras</ListTitle>
      <div>
        <List>{__mock_list__ && __mock_list__.map((product, i) => <Product key={i}>{product.label}</Product>)}</List>
      </div>
      <NewProduct>
        <AppInput
          label="Novo produto"
          fullWidth={true}
          placeholder="Digite um produto"
          value={novoProduto}
          setValue={setNovoProduto}
        />
      </NewProduct>
    </ShoppingList>
  );
};

export default DashboardPage;
