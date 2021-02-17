import React from 'react';
import { ProductModel } from '../../../models';
import styled from 'styled-components';
import { AppIconButton } from './../../utils/buttons';
import { AddIcon, RemoveIcon } from './../../utils/icons';

interface ComponentProps {
  product: ProductModel;
  changeProductQuantity: (increase: boolean, id: string) => void;
}

const QuantitySelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 32px 0px 16px;
`;

const QuantityLabel = styled.div`
  display: flex;
  font-size: 1.5rem;
`;

const IncreaseButton = styled.div`
  display: flex;
`;

const DecreaseButton = styled.div`
  display: flex;
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
        <AppIconButton testId="decreaseButton" onClick={() => decreaseQuantity()}>
          <RemoveIcon />
        </AppIconButton>
      </DecreaseButton>
      <QuantityLabel data-testid="quantity">{product.quantity}</QuantityLabel>
      <IncreaseButton>
        <AppIconButton testId="increaseButton" onClick={() => increaseQuantity()}>
          <AddIcon />
        </AppIconButton>
      </IncreaseButton>
    </QuantitySelector>
  );
};
