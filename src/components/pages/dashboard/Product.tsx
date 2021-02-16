import React, { useState } from 'react';
import styled from 'styled-components';
import { Quantity } from './Quantity';
import { ProductModel } from '../../../models';
import { AppListItem, AppIconButton, AppCheckbox } from './../../utils';
import { DeleteIcon } from './../../utils/icons';

interface ComponentProps {
  product: ProductModel;
  onRemoveProduct: (id: string) => void;
  changeProductQuantity: (increase: boolean, id: string) => void;
}

const ProductLabel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const Product = ({ product, onRemoveProduct, changeProductQuantity }: ComponentProps) => {
  const [checked, setChecked] = useState(false);
  const checkbox = <AppCheckbox edge="end" setChecked={setChecked} checked={checked} />;

  const removeProductIconButton = (
    <AppIconButton onClick={() => onRemoveProduct(product.id)}>
      <DeleteIcon />
    </AppIconButton>
  );

  return (
    <AppListItem
      paddingTop="8px"
      paddingBottom="8px"
      paddingLeft="16px"
      fontSize="1.5rem"
      secondaryAction={checkbox}
      icon={removeProductIconButton}
    >
      <ProductLabel>
        <Quantity product={product} changeProductQuantity={changeProductQuantity} />
        <div>
          {checked ? (
            <s>
              (R$ {product.unityPrice}) {product.label}
            </s>
          ) : (
            `(R$ ${product.unityPrice}) ${product.label} `
          )}
        </div>
      </ProductLabel>
    </AppListItem>
  );
};
