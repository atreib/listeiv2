import React, { useState } from 'react';
import styled from 'styled-components';
import { Quantity } from './Quantity';
import { ProductModel } from '../../../models';
import { AppListItem, AppIconButton, AppCheckbox } from './../../utils';
import { DeleteIcon } from './../../utils/icons';
import { colors } from '../../../helpers/theme';

interface ComponentProps {
  product: ProductModel;
  onRemoveProduct: (id: string) => void;
  changeProductQuantity: (increase: boolean, id: string) => void;
}

const ProductLabel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
`;

export const Product = ({ product, onRemoveProduct, changeProductQuantity }: ComponentProps) => {
  const [checked, setChecked] = useState(false);
  const checkbox = <AppCheckbox testId="productCheckbox" edge="end" setChecked={setChecked} checked={checked} />;

  const removeProductIconButton = (
    <AppIconButton
      size="small"
      bgColor={colors.contrastPrimary}
      fontColor={colors.contrastBackground}
      testId="btnRemoveProduct"
      onClick={() => onRemoveProduct(product.id)}
    >
      <DeleteIcon />
    </AppIconButton>
  );

  return (
    <AppListItem
      paddingTop="8px"
      paddingBottom="8px"
      paddingLeft="8px"
      fontSize="1.3rem"
      secondaryAction={checkbox}
      icon={removeProductIconButton}
    >
      <ProductLabel>
        <Quantity product={product} changeProductQuantity={changeProductQuantity} />
        <div data-testid="productLabel">{checked ? <s>{product.label}</s> : `${product.label} `}</div>
      </ProductLabel>
    </AppListItem>
  );
};
