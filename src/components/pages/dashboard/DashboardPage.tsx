import React, { useState, useContext, useEffect } from 'react';
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
  NewListIcon,
  TotalPriceLabel,
} from './DashboardPage.styles';
import { colors } from './../../../helpers/theme';
import { ShoppingListContext } from './../../../contexts';
import { AppConfirmDialog } from '../../utils';

export const DashboardPage = () => {
  const [isStartNewListConfirmDialogOpened, setIsStartNewListConfirmDialogOpened] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [newProduct, setNewProduct] = useState<string>('');
  const {
    products,
    addProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProduct,
    startNewList,
    changeProductPrice,
  } = useContext(ShoppingListContext);

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

  /**
   * Change product price on state
   * @param price: (number) the new product price
   * @param id: (string) id of the product being modified
   */
  const onChangeProductPrice = (price: number, id: string) => {
    changeProductPrice(price, id);
  };

  /**
   * Start a new shopping list
   */
  const onStartNewList = () => {
    startNewList();
    setIsStartNewListConfirmDialogOpened(false);
  };

  useEffect(() => {
    if (products && products.length > 0) {
      const totalPriceObject = products.reduce((x, y) => ({ ...x, totalPrice: x.totalPrice + y.totalPrice }));
      if (totalPriceObject) setTotalPrice(totalPriceObject.totalPrice);
    } else {
      setTotalPrice(0);
    }
  }, [products]);

  return (
    <>
      {isStartNewListConfirmDialogOpened && (
        <AppConfirmDialog
          title="Você tem certeza?"
          description="Você deseja iniciar uma nova lista de compras vazia?"
          dialogOpen={isStartNewListConfirmDialogOpened}
          setDialogOpen={setIsStartNewListConfirmDialogOpened}
          successBtnText="Nova lista"
          testId="newListConfirm"
          fnSuccess={() => onStartNewList()}
        />
      )}
      <ShoppingList>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Listei</title>
          <style>{`body { background-color: ${colors.background}; color: ${colors.contrastBackground}; }`}</style>
        </Helmet>
        <ListTitle>
          <div>Lista de compras</div>
          <div>
            <AppButton
              testId="startNewListBtn"
              bgColor={colors.primary}
              fontColor={colors.contrastPrimary}
              onClick={() => setIsStartNewListConfirmDialogOpened(true)}
            >
              <NewListIcon />
            </AppButton>
          </div>
        </ListTitle>
        <ListWrapper>
          {products && (
            <AppList>
              {products.map((product) => (
                <Product
                  changeProductPrice={onChangeProductPrice}
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
        <TotalPriceLabel data-testid="totalPriceLbl">
          Total: R$ {totalPrice.toFixed(2).replace('.', ',')}
        </TotalPriceLabel>
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
    </>
  );
};

export default DashboardPage;
