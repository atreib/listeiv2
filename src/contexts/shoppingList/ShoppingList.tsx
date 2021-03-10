import React, { useState, createContext, ReactChild, ReactChildren, useEffect, useContext } from 'react';
import { generateUuid } from '../../helpers/uuid';
import { ProductModel, ShoppingListModel } from '../../models';
import { ShoppingListHistoryContext } from '../shoppingListHistory';

interface ComponentProps {
  children: ReactChild | ReactChildren;
}

type ProviderType = {
  products: ProductModel[];
  changeProductPrice: (price: number, productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
  addProduct: (productName: string) => void;
  startNewList: () => void;
  setOpenedList: (shoppingList: ShoppingListModel) => void;
};

const initialProviderValues: ProviderType = {
  products: [],
  changeProductPrice: () => null,
  increaseProductQuantity: () => null,
  decreaseProductQuantity: () => null,
  removeProduct: () => null,
  addProduct: () => null,
  startNewList: () => null,
  setOpenedList: () => null,
};

const ShoppingListContext = createContext<ProviderType>(initialProviderValues);

/**
 * Shopping list context provider
 * * Export products list
 * * Export function for adding a product on list's end
 * * Export function for removing a specific product by id
 * * Export function for increasing product quantity by one through id
 * * Export function for decreasing product quantity by one through id
 * * Export function for starting a new shopping list
 * * Export function for changing product price by id
 * * Every change on shopping list is persisted
 * @param children: (ReactChild | ReactChildren) children content
 */
const ShoppingListProvider = ({ children }: ComponentProps) => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const { addShoppingList } = useContext(ShoppingListHistoryContext);

  /**
   * Adds a new product to the shopping list state
   * * @param productName: (string) inserted product label
   */
  const addProduct = (productName: string) => {
    const newitem = {
      id: generateUuid(),
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
        if (x.id === id) {
          const newQuantity = x.quantity + 1;
          return { ...x, quantity: newQuantity, totalPrice: x.unityPrice * newQuantity };
        }
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
        if (x.id === id) {
          const newQuantity = x.quantity === 1 ? 1 : x.quantity - 1;
          return { ...x, quantity: newQuantity, totalPrice: x.unityPrice * newQuantity };
        }
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
    addShoppingList({
      id: generateUuid(),
      date: new Date(),
      products: products,
    });
    setProducts([]);
    localStorage.setItem('openedShoppingList', '');
  };

  /**
   * Change product price
   * @param price: (number) new product price
   * @param id: (string) id of the product being modified
   */
  const changeProductPrice = (price: number, id: string) => {
    setProducts(
      products.map((x) => {
        if (x.id === id) return { ...x, unityPrice: price, totalPrice: price * x.quantity };
        return x;
      }),
    );
  };

  /**
   * Set the opened shopping list
   * @param shoppingList: (ShoppingListModel) new opened shopping list
   */
  const setOpenedList = (shoppingList: ShoppingListModel) => {
    setProducts(shoppingList.products);
  };

  /**
   * Any change on shopping list is persisted
   */
  useEffect(() => {
    if (products && products.length > 0) localStorage.setItem('openedShoppingList', JSON.stringify(products));
  }, [products]);

  /**
   * At first load, we retrieve our last shopping list from persistence layer
   */
  useEffect(() => {
    const localStorageShoppingList = localStorage.getItem('openedShoppingList');
    if (localStorageShoppingList && localStorageShoppingList !== '') {
      const storedProducts = JSON.parse(localStorageShoppingList);
      setProducts(storedProducts);
    }
  }, [setProducts]);

  return (
    <ShoppingListContext.Provider
      value={{
        products,
        changeProductPrice,
        increaseProductQuantity,
        decreaseProductQuantity,
        removeProduct,
        addProduct,
        startNewList,
        setOpenedList,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export { ShoppingListContext, ShoppingListProvider };
