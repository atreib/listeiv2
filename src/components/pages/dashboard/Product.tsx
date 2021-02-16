import React, { useState } from 'react';
import { ProductModel } from '../../../models';
import { AppListItem } from './../../utils/listItem/ListItem';

import DeleteIcon from '@material-ui/icons/Delete';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import { ListItemIcon } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

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
          <IconButton onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        </ListItemIcon>
        {product.label}
        <ListItemSecondaryAction>
          <Checkbox edge="end" onChange={() => setChecked(!checked)} checked={checked} />
        </ListItemSecondaryAction>
      </>
    </AppListItem>
  );
};
