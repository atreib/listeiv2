import React, { ReactChildren, ReactChild } from 'react';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { ListItemIcon } from '@material-ui/core';

interface ComponentProps {
  children: ReactChild | ReactChildren;
  icon?: ReactChild | ReactChildren;
  secondaryAction?: ReactChild | ReactChildren;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  fontSize?: string;
  onListItemClick?: () => void;
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
 * @param children (ReactChild | ReactChildren) Main text/label of list item
 * @param icon (ReactChild | ReactChildren) Optional icon (iconbutton, icon...) on start of list item
 * @param secondaryAction? (ReactChild | ReactChildren) Optional action (button/checkbox...) on end of list item
 * @param paddingTop? (string) List item padding-top (use "px")
 * @param paddingRight? (string) List item padding-right (use "px")
 * @param paddingBottom? (string) List item padding-bottom (use "px")
 * @param paddingLeft? (string) List item padding-left (use "px")
 * @param marginTop? (string) List item margin-top (use "px")
 * @param marginRight? (string) List item margin-right (use "px")
 * @param marginBottom? (string) List item margin-bottom (use "px")
 * @param marginLeft? (string) List item margin-left (use "px")
 * @param fontSize? (string) List item font-size (use "rem")
 * @param onListItemClick? (() => void) On list item click handler
 */
export const AppListItem = ({
  children,
  icon,
  secondaryAction,
  fontSize,
  onListItemClick,
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
        onClick={onListItemClick}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        {children}
        <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction>
      </StyledListItem>
    </StylesProvider>
  );
};
