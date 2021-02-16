import React from 'react';
import styled from 'styled-components';
import { ProductModel } from '../../../models';

interface ComponentProps {
  product: ProductModel;
}

const StyledProduct = styled.li`
  padding: 8px 0px;
  font-size: 1.5rem;
`;

export const Product = ({ product }: ComponentProps) => {
  return <StyledProduct>{product.label}</StyledProduct>;
};
