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
import { ProductModel } from './../../../models';
import { generate } from './../../../helpers/uuid';
import { colors } from './../../../helpers/theme';

export const DashboardPage = () => {
  const [shoppingList, setShoppingList] = useState<ProductModel[]>();
  const [newProduct, setNewProduct] = useState<string>('');

  /**
   * Adds a new product to the shopping list state
   * * Uses the value typed on newProduct's state
   */
  const onAddNewProduct = () => {
    if (newProduct && newProduct !== '') {
      const newitem = {
        id: generate(),
        label: newProduct,
        quantity: 1,
        unityPrice: 0.0,
        totalPrice: 0.0,
      };

      if (shoppingList) setShoppingList([...shoppingList, newitem]);
      if (!shoppingList) setShoppingList([newitem]);
      setNewProduct('');
    }
  };

  /**
   * Removes a product on state
   * @param id: (number) id of the removed product
   */
  const removeProduct = (id: string) => {
    if (shoppingList) setShoppingList(shoppingList.filter((x) => x.id !== id));
  };

  /**
   * Change product quantity on state
   * @param increase: (boolean) if should increase or decrease product quantity
   * @param id: (string) id of the product being modified
   */
  const changeProductQuantity = (increase: boolean, id: string) => {
    if (shoppingList)
      setShoppingList(
        shoppingList.map((x) => {
          if (x.id === id) {
            return {
              ...x,
              quantity: increase ? x.quantity + 1 : x.quantity === 1 ? 1 : x.quantity - 1,
            };
          }
          return x;
        }),
      );
  };

  return (
    <ShoppingList>
      <ListTitle>Lista de compras</ListTitle>
      <ListWrapper>
        {shoppingList && (
          <AppList>
            {shoppingList.map((product) => (
              <Product
                changeProductQuantity={changeProductQuantity}
                onRemoveProduct={removeProduct}
                product={product}
                key={product.id}
              />
            ))}
          </AppList>
        )}
        {!shoppingList && 'Lista vazia'}
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
          data-testid="btnAddProduct"
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
