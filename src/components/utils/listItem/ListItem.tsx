import React, { ReactChildren, ReactChild } from 'react';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

interface ComponentProps {
  children: ReactChild | ReactChildren;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  fontSize?: string;
}

interface StyledProps {
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
  fontSize?: string;
}

const StyledListItem = styled(ListItem)<StyledProps>`
  margin: ${({ marginTop, marginRight, marginBottom, marginLeft }) =>
    `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`};
  padding: ${({ paddingTop, paddingRight, paddingBottom, paddingLeft }) =>
    `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
`;

export const AppListItem = ({
  children,
  fontSize,
  paddingTop = '0px',
  paddingRight = '0px',
  paddingBottom = '0px',
  paddingLeft = '0px',
  marginTop = '0px',
  marginRight = '0px',
  marginBottom = '0px',
  marginLeft = '0px',
}: ComponentProps) => {
  return (
    <StylesProvider injectFirst>
      <StyledListItem
        paddingTop={paddingTop}
        paddingRight={paddingRight}
        paddingBottom={paddingBottom}
        paddingLeft={paddingLeft}
        marginTop={marginTop}
        marginRight={marginRight}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        fontSize={fontSize}
        button
      >
        {children}
      </StyledListItem>
    </StylesProvider>
  );
};
