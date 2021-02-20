import React from 'react';
import {
  QuantitySelector,
  QuantityLabel,
  IncreaseQuantityButton,
  DecreaseQuantityButton,
} from './DashboardPage.styles';
import { ProductModel } from '../../../models';
import { AppIconButton } from './../../utils/buttons';
import { PlusIcon, MinusIcon } from './../../utils/icons';
import { colors } from '../../../helpers/theme';

interface ComponentProps {
  product: ProductModel;
  changeProductQuantity: (increase: boolean, id: string) => void;
}

export const Quantity = ({ product, changeProductQuantity }: ComponentProps) => {
  const increaseQuantity = () => {
    changeProductQuantity(true, product.id);
  };

  const decreaseQuantity = () => {
    changeProductQuantity(false, product.id);
  };

  return (
    <QuantitySelector>
      <DecreaseQuantityButton>
        <AppIconButton
          size="small"
          bgColor={colors.primary}
          fontColor={colors.contrastPrimary}
          testId="decreaseButton"
          onClick={() => decreaseQuantity()}
        >
          <MinusIcon />
        </AppIconButton>
      </DecreaseQuantityButton>
      <QuantityLabel data-testid="quantity">{product.quantity}</QuantityLabel>
      <IncreaseQuantityButton>
        <AppIconButton
          size="small"
          bgColor={colors.primary}
          fontColor={colors.contrastPrimary}
          testId="increaseButton"
          onClick={() => increaseQuantity()}
        >
          <PlusIcon />
        </AppIconButton>
      </IncreaseQuantityButton>
    </QuantitySelector>
  );
};
