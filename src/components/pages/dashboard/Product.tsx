import React, { useState } from 'react';
import styled from 'styled-components';
import { Quantity } from './Quantity';
import { ProductModel } from '../../../models';
import { AppListItem, AppIconButton, AppCheckbox } from './../../utils';
import { DeleteIcon } from './../../utils/icons';
import { colors } from '../../../helpers/theme';
import { AppPromptDialog } from '../../utils/dialogs/PromptDialog';

interface ComponentProps {
  product: ProductModel;
  onRemoveProduct: (id: string) => void;
  changeProductQuantity: (increase: boolean, id: string) => void;
  changeProductPrice: (price: number, id: string) => void;
}

const ProductLabelWrapper = styled.div`
  flex: 1;
  max-width: 75%;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
`;

const ProductLabel = styled.div`
  flex: 1;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-right: 0px;
`;

const PriceLabel = styled.div`
  font-size: 0.8rem;
  color: ${colors.contrastBackgroundLighter};
`;

export const Product = ({ product, onRemoveProduct, changeProductQuantity, changeProductPrice }: ComponentProps) => {
  const [checked, setChecked] = useState(false);
  const [isPromptPriceOpened, setIsPromptPriceOpened] = useState(false);

  const onCheckboxClick = () => {
    if (!checked) setIsPromptPriceOpened(true);
  };

  const checkbox = (
    <AppCheckbox
      testId="productCheckbox"
      clickHandler={onCheckboxClick}
      edge="end"
      setChecked={setChecked}
      checked={checked}
    />
  );

  const removeProductIconButton = (
    <AppIconButton
      size="small"
      bgColor={colors.background}
      fontColor={colors.danger}
      testId="btnRemoveProduct"
      onClick={() => onRemoveProduct(product.id)}
    >
      <DeleteIcon />
    </AppIconButton>
  );

  return (
    <>
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
        icon={removeProductIconButton}
      >
        <ProductLabelWrapper>
          <div>
            <Quantity product={product} changeProductQuantity={changeProductQuantity} />
          </div>
          <ProductLabel>
            <div data-testid="productLabel">{checked ? <s>{product.label}</s> : `${product.label} `}</div>
            <PriceLabel data-testid="productPriceLabel">
              R$ {product.unityPrice.toFixed(2).replace('.', ',')}
            </PriceLabel>
          </ProductLabel>
        </ProductLabelWrapper>
      </AppListItem>
    </>
  );
};
