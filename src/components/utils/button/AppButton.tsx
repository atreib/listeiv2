import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

interface ComponentProps {
  disabled?: boolean;
}

const OurButton = styled(Button)``;

export const AppButton = ({ disabled = false }: ComponentProps) => {
  return <OurButton disabled={disabled}>teste</OurButton>;
};
