import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  ShoppingList,
  ListTitle,
  NewProduct,
  ListWrapper,
  Product,
  AppInput,
  AppButton,
  AppList,
  NoteAddIcon,
} from './DashboardPage.styles';
import { colors } from './../../../helpers/theme';
import { ShoppingListContext } from './../../../contexts';

export const DashboardPage = () => {
  const [newProduct, setNewProduct] = useState<string>('');
  const { products, addProduct, increaseProductQuantity, decreaseProductQuantity, removeProduct } = useContext(
    ShoppingListContext,
  );

  /**
   * Adds a new product to the shopping list state
   * * Uses the value typed on newProduct's state
   */
  const onAddNewProduct = () => {
    if (newProduct && newProduct !== '') {
      addProduct(newProduct);
      setNewProduct('');
    }
  };

  /**
   * Removes a product on state
   * @param id: (number) id of the removed product
   */
  const onRemoveProduct = (id: string) => {
    removeProduct(id);
  };

  /**
   * Change product quantity on state
   * @param increase: (boolean) if should increase or decrease product quantity
   * @param id: (string) id of the product being modified
   */
  const changeProductQuantity = (increase: boolean, id: string) => {
    if (increase) increaseProductQuantity(id);
    if (!increase) decreaseProductQuantity(id);
  };

  return (
    <ShoppingList>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lista de compras</title>
        <style>{`body { background-color: ${colors.background}; color: ${colors.contrastBackground}; }`}</style>
      </Helmet>
      <ListTitle>
        <div>Lista de compras</div>
        <div>
          <AppButton bgColor={colors.primary} fontColor={colors.contrastPrimary} onClick={() => console.log('clicou')}>
            <NoteAddIcon />
          </AppButton>
        </div>
      </ListTitle>
      <ListWrapper>
        {products && (
          <AppList>
            {products.map((product) => (
              <Product
                changeProductQuantity={changeProductQuantity}
                onRemoveProduct={onRemoveProduct}
                product={product}
                key={product.id}
              />
            ))}
          </AppList>
        )}
        {(!products || products.length === 0) && 'Lista vazia'}
      </ListWrapper>
      <NewProduct>
        <AppInput
          data-testid="inputProduct"
          label="Novo produto"
          placeholder="Digite um produto"
          value={newProduct}
          setValue={setNewProduct}
        />
        <AppButton
          testId="btnAddProduct"
          bgColor={colors.primary}
          fontColor={colors.contrastPrimary}
          onClick={onAddNewProduct}
        >
          Add
        </AppButton>
      </NewProduct>
    </ShoppingList>
  );
};

export default DashboardPage;
