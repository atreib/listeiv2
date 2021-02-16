import React, { ReactChild, ReactChildren } from 'react';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

interface ComponentProps {
  children: ReactChild[] | ReactChildren[];
}

const StyledList = styled(List)`
  margin: 0;
  padding: 0;
`;

export const AppList = ({ children }: ComponentProps) => {
  return (
    <StylesProvider injectFirst>
      <StyledList dense>{children}</StyledList>
    </StylesProvider>
  );
};
