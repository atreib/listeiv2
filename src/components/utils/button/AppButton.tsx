import React, { ReactChild, ReactChildren } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

interface ComponentProps {
  children: ReactChild | ReactChildren;
  disabled?: boolean;
}

const OurButton = styled(Button)``;

export const AppButton = ({ children, disabled = false }: ComponentProps) => {
  return <OurButton disabled={disabled}>{children}</OurButton>;
};
