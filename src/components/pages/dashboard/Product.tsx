import React, { useState } from 'react';
import { ProductModel } from '../../../models';
import { AppListItem, AppIconButton, AppCheckbox } from './../../utils';
import { DeleteIcon } from './../../utils/icons';

interface ComponentProps {
  product: ProductModel;
}

export const Product = ({ product }: ComponentProps) => {
  const [checked, setChecked] = useState(false);

  const handleRemove = () => {
    console.log('teste');
  };

  const icon = (
    <AppIconButton onClick={handleRemove}>
      <DeleteIcon />
    </AppIconButton>
  );
  const checkbox = <AppCheckbox edge="end" setChecked={setChecked} checked={checked} />;

  return (
    <AppListItem
      paddingTop="8px"
      paddingBottom="8px"
      paddingLeft="16px"
      fontSize="1.5rem"
      secondaryAction={checkbox}
      icon={icon}
    >
      {product.label}
    </AppListItem>
  );
};
