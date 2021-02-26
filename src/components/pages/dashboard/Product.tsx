import React, { useState } from 'react';
import {
  ProductLabelWrapper,
  ProductNameLabel,
  ProductPriceLabel,
  AppPromptDialog,
  AppListItem,
  AppIconButton,
  AppCheckbox,
  Quantity,
  AppConfirmDialog,
} from './DashboardPage.styles';
import { ProductModel } from '../../../models';
import { colors } from '../../../helpers/theme';

interface ComponentProps {
  product: ProductModel;
  onRemoveProduct: (id: string) => void;
  changeProductQuantity: (increase: boolean, id: string) => void;
  changeProductPrice: (price: number, id: string) => void;
}

/**
 * A list item with product data, checkbox and quantity selector
 * @param product: (ProductModel) the product object
 * @param onRemoveProduct: ((id: string) => void) remove product callback
 * * id: (string) product id
 * @param changeProductQuantity: ((increase: boolean, id: string) => void) change product quantity callback
 * * increase: (boolean) if should increase (true) or decrease (false) by one
 * * id: (string) product id
 * @param changeProductPrice: ((price: number, id: string) => void) change product price callback
 * * price: (number) new product price
 * * id: (string) product id
 */
export const Product = ({ product, onRemoveProduct, changeProductQuantity, changeProductPrice }: ComponentProps) => {
  const [checked, setChecked] = useState(false);
  const [isPromptPriceOpened, setIsPromptPriceOpened] = useState(false);
  const [isRemovalConfirmDialogOpened, setIsRemovalConfirmDialogOpened] = useState(false);

  const onCheckboxClick = () => {
    if (!checked) setIsPromptPriceOpened(true);
  };

  const checkbox = (
    <AppCheckbox
      testId={`productCheckbox_${product.label}`}
      clickHandler={onCheckboxClick}
      edge="end"
      setChecked={setChecked}
      checked={checked}
    />
  );

  const confirmRemoveProduct = () => {
    onRemoveProduct(product.id);
    setIsRemovalConfirmDialogOpened(false);
  };

  // we are creating this invisible
  // remove button inside product itemlist
  // so we can test what happens when we try
  // to remove a product
  // (because testing library hasn't a swipe simulator)
  const removeProductIconButton = (
    <AppIconButton
      size="small"
      bgColor={colors.background}
      fontColor={colors.danger}
      testId={`removeProductBtn_${product.label}`}
      onClick={() => setIsRemovalConfirmDialogOpened(true)}
    >
      &nbsp;
    </AppIconButton>
  );

  return (
    <>
      {isRemovalConfirmDialogOpened && (
        <AppConfirmDialog
          title="Você tem certeza?"
          description="Você deseja remover este produto da sua lista de compras?"
          dialogOpen={isRemovalConfirmDialogOpened}
          setDialogOpen={setIsRemovalConfirmDialogOpened}
          successBtnText="Remover produto"
          testId="removalConfirm"
          fnSuccess={() => confirmRemoveProduct()}
        />
      )}
      {isPromptPriceOpened && (
        <AppPromptDialog
          title="Adicionar preço ao produto"
          description="Qual é o preço deste produto?"
          placeholder="R$"
          inputLabel="Preço"
          type="number"
          dialogOpen={isPromptPriceOpened}
          setDialogOpen={setIsPromptPriceOpened}
          successBtnText="Anotar preço"
          testId="pricePrompt"
          fnSuccess={(typedPrice: string) => {
            if (typedPrice) {
              const price = typedPrice.replace(',', '.');
              const numberPrice = Number(price);
              if (!isNaN(numberPrice)) {
                changeProductPrice(numberPrice, product.id);
                setIsPromptPriceOpened(false);
              }
            }
          }}
        />
      )}
      <AppListItem
        paddingTop="8px"
        paddingBottom="8px"
        paddingLeft="0px"
        fontSize="1.3rem"
        secondaryAction={checkbox}
        enableSwipeLeft={true}
        leftActionBackgrond={colors.danger}
        leftActionFontColor={colors.contrastDanger}
        onSwipedLeft={() => setIsRemovalConfirmDialogOpened(true)}
      >
        <ProductLabelWrapper>
          {removeProductIconButton}
          <ProductNameLabel>
            <div data-testid={`productLbl_${product.label}`}>
              {checked ? <s>{product.label}</s> : `${product.label} `}
            </div>
            <ProductPriceLabel data-testid={`priceLbl_${product.label}`}>
              R$ {product.unityPrice.toFixed(2).replace('.', ',')}
            </ProductPriceLabel>
          </ProductNameLabel>
          <div>
            <Quantity
              product={product}
              changeProductQuantity={changeProductQuantity}
              decreaseButtonTestId={`decreaseBtn_${product.label}`}
              increaseButtonTestId={`increaseBtn_${product.label}`}
              quantityLabelTestId={`quantityLbl_${product.label}`}
            />
          </div>
        </ProductLabelWrapper>
      </AppListItem>
    </>
  );
};
