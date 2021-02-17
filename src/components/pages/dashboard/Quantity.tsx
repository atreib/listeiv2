import React from 'react';
import { ProductModel } from '../../../models';
import styled from 'styled-components';
import { AppIconButton } from './../../utils/buttons';
import { PlusIcon, MinusIcon } from './../../utils/icons';
import { colors } from '../../../helpers/theme';

interface ComponentProps {
  product: ProductModel;
  changeProductQuantity: (increase: boolean, id: string) => void;
}

const QuantitySelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 16px 0px 8px;
`;

const QuantityLabel = styled.div`
  display: flex;
  font-size: 1.2rem;
`;

const IncreaseButton = styled.div`
  display: flex;
  margin: 0px 8px;
`;

const DecreaseButton = styled.div`
  display: flex;
  margin: 0px 8px;
`;

export const Quantity = ({ product, changeProductQuantity }: ComponentProps) => {
  const increaseQuantity = () => {
    changeProductQuantity(true, product.id);
  };

  const decreaseQuantity = () => {
    changeProductQuantity(false, product.id);
  };

  return (
    <QuantitySelector>
      <DecreaseButton>
        <AppIconButton
          size="small"
          bgColor={colors.primary}
          fontColor={colors.contrastPrimary}
          testId="decreaseButton"
          onClick={() => decreaseQuantity()}
        >
          <MinusIcon />
        </AppIconButton>
      </DecreaseButton>
      <QuantityLabel data-testid="quantity">{product.quantity}</QuantityLabel>
      <IncreaseButton>
        <AppIconButton
          size="small"
          bgColor={colors.primary}
          fontColor={colors.contrastPrimary}
          testId="increaseButton"
          onClick={() => increaseQuantity()}
        >
          <PlusIcon />
        </AppIconButton>
      </IncreaseButton>
    </QuantitySelector>
  );
};
