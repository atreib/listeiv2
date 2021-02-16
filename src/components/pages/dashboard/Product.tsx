import React, { useState } from 'react';
import { ProductModel } from '../../../models';
import { AppListItem, AppIconButton } from './../../utils';
import { DeleteIcon } from './../../utils/icons';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import { ListItemIcon } from '@material-ui/core';

interface ComponentProps {
  product: ProductModel;
}

export const Product = ({ product }: ComponentProps) => {
  const [checked, setChecked] = useState(false);

  const handleRemove = () => {
    console.log('teste');
  };

  return (
    <AppListItem paddingTop="8px" paddingBottom="8px" paddingLeft="16px" fontSize="1.5rem">
      <>
        <ListItemIcon>
          <AppIconButton onClick={handleRemove}>
            <DeleteIcon />
          </AppIconButton>
        </ListItemIcon>
        {product.label}
        <ListItemSecondaryAction>
          <Checkbox edge="end" onChange={() => setChecked(!checked)} checked={checked} />
        </ListItemSecondaryAction>
      </>
    </AppListItem>
  );
};
