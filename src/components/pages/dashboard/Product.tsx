import React from 'react';
import { ProductModel } from '../../../models';
import { AppListItem } from './../../utils/listItem/ListItem';

interface ComponentProps {
  product: ProductModel;
}

export const Product = ({ product }: ComponentProps) => {
  return (
    <AppListItem paddingTop="8px" paddingBottom="8px" paddingLeft="16px" fontSize="1.5rem">
      {product.label}
    </AppListItem>
  );
};
