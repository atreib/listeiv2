import React from 'react';
import styled from 'styled-components';

interface ComponentProps {
  productName: string;
}

const StyledProduct = styled.li`
  padding: 8px 0px;
  font-size: 1.5rem;
`;

export const Product = ({ productName }: ComponentProps) => {
  return <StyledProduct>{productName}</StyledProduct>;
};
