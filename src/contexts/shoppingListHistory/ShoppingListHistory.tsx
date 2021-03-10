import React, { useState, createContext, ReactChild, ReactChildren, useEffect } from 'react';
import { ShoppingListModel } from '../../models';

interface ComponentProps {
  children: ReactChild | ReactChildren;
}

type ProviderType = {
  history: ShoppingListModel[];
  addShoppingList: (shoppingList: ShoppingListModel) => void;
};

const initialProviderValues: ProviderType = {
  history: [],
  addShoppingList: () => null,
};

const ShoppingListHistoryContext = createContext<ProviderType>(initialProviderValues);

/**
 * Shopping list history context provider
 * * Export history list
 * * Add shopping list to history
 * * Every change is persisted in localStorage
 * @param children: (ReactChild | ReactChildren) children content
 */
const ShoppingListHistoryProvider = ({ children }: ComponentProps) => {
  const [history, setHistory] = useState<ShoppingListModel[]>([]);

  /**
   * Adds a shopping list to the shopping list history state
   * * @param shoppingList: (ShoppingListModel) inserted shopping list
   */
  const addShoppingList = (shoppingList: ShoppingListModel) => {
    if (history) setHistory([...history, shoppingList]);
    if (!history) setHistory([shoppingList]);
  };

  /**
   * Any change on shopping list history is persisted
   */
  useEffect(() => {
    if (history && history.length > 0) localStorage.setItem('shoppingListHistory', JSON.stringify(history));
  }, [history]);

  /**
   * At first load, we retrieve our last history from persistence layer
   */
  useEffect(() => {
    const localStorageHistory = localStorage.getItem('shoppingListHistory');
    if (localStorageHistory && localStorageHistory !== '') {
      const storedProducts = JSON.parse(localStorageHistory);
      setHistory(storedProducts);
    }
  }, [setHistory]);

  return (
    <ShoppingListHistoryContext.Provider
      value={{
        history,
        addShoppingList,
      }}
    >
      {children}
    </ShoppingListHistoryContext.Provider>
  );
};

export { ShoppingListHistoryContext, ShoppingListHistoryProvider };
