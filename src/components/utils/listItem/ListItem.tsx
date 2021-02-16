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

/**
 * Our default ListItem component
 * @param options: (ComponentProps) {
 * * children: (ReactChild | ReactChildren) Main text/label of list item
 * * paddingTop?: (string) List item padding-top (use "px")
 * * paddingRight?: (string) List item padding-right (use "px")
 * * paddingBottom?: (string) List item padding-bottom (use "px")
 * * paddingLeft?: (string) List item padding-left (use "px")
 * * marginTop?: (string) List item margin-top (use "px")
 * * marginRight?: (string) List item margin-right (use "px")
 * * marginBottom?: (string) List item margin-bottom (use "px")
 * * marginLeft?: (string) List item margin-left (use "px")
 * * fontSize?: (string) List item font-size (use "rem")
 * }
 *
 */
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
