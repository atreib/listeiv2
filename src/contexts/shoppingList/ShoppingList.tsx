import React, { useState, createContext, ReactChild, ReactChildren, useEffect } from 'react';
import { generate } from '../../helpers/uuid';
import { ProductModel, ShoppingListModel } from '../../models';

interface ComponentProps {
  children: ReactChild | ReactChildren;
}

type ProviderType = {
  products: ProductModel[];
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
  addProduct: (productName: string) => void;
  startNewList: () => void;
};

const initialProviderValues: ProviderType = {
  products: [],
  increaseProductQuantity: () => null,
  decreaseProductQuantity: () => null,
  removeProduct: () => null,
  addProduct: () => null,
  startNewList: () => null,
};

const ShoppingListContext = createContext<ProviderType>(initialProviderValues);

const ShoppingListProvider = ({ children }: ComponentProps) => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  /**
   * Adds a new product to the shopping list state
   * * @param productName: (string) inserted product label
   */
  const addProduct = (productName: string) => {
    const newitem = {
      id: generate(),
      label: productName,
      quantity: 1,
      unityPrice: 0.0,
      totalPrice: 0.0,
    };

    if (products) setProducts([...products, newitem]);
    if (!products) setProducts([newitem]);
  };

  /**
   * Removes a product from shopping list
   * @param id: (string) id of the removed product
   */
  const removeProduct = (id: string) => {
    setProducts(products.filter((x) => x.id !== id));
  };

  /**
   * Increase product quantity by one
   * @param id: (string) id of the product being modified
   */
  const increaseProductQuantity = (id: string) => {
    setProducts(
      products.map((x) => {
        if (x.id === id) return { ...x, quantity: x.quantity + 1 };
        return x;
      }),
    );
  };

  /**
   * Decrease product quantity by one
   * @param id: (string) id of the product being modified
   */
  const decreaseProductQuantity = (id: string) => {
    setProducts(
      products.map((x) => {
        if (x.id === id) return { ...x, quantity: x.quantity === 1 ? 1 : x.quantity - 1 };
        return x;
      }),
    );
  };

  /**
   * Start new shopping list
   * - Store the current shopping list on localStorage
   * - Start a new, empty, one
   */
  const startNewList = () => {
    let history: ShoppingListModel[] = [];
    const localStorageHistory = localStorage.getItem('shoppingListHistory');
    if (localStorageHistory && localStorageHistory !== '') history = JSON.parse(localStorageHistory);
    history.push({
      id: generate(),
      products: products,
    });
    localStorage.setItem('shoppingListHistory', JSON.stringify(history));
    setProducts([]);
    localStorage.setItem('openedShoppingList', '');
  };

  useEffect(() => {
    if (products && products.length > 0) localStorage.setItem('openedShoppingList', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const localStorageShoppingList = localStorage.getItem('openedShoppingList');
    if (localStorageShoppingList && localStorageShoppingList !== '') {
      const storedProducts = JSON.parse(localStorageShoppingList);
      setProducts(storedProducts);
    }
  }, [setProducts]);

  return (
    <ShoppingListContext.Provider
      value={{ products, increaseProductQuantity, decreaseProductQuantity, removeProduct, addProduct, startNewList }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export { ShoppingListContext, ShoppingListProvider };
