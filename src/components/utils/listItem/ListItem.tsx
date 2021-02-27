import React, { ReactChildren, ReactChild, useRef, useState, ReactElement } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { ListItemIcon } from '@material-ui/core';
import { colors } from './../../../helpers/theme';

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
  enableSwipeLeft?: boolean;
  onSwipedLeft?: (event: React.TransitionEvent<Element>) => void;
  leftActionIcon?: ReactElement;
  leftActionBackgrond?: string;
  leftActionFontColor?: string;
  leftActionText?: string;
  testId?: string;
}

interface StyledProps {
  paddingtop: string;
  paddingright: string;
  paddingbottom: string;
  paddingleft: string;
  margintop: string;
  marginright: string;
  marginbottom: string;
  marginleft: string;
  fontSize?: string;
}

const StyledListItem = styled(ListItem)<StyledProps>`
  margin: ${({ margintop, marginright, marginbottom, marginleft }) =>
    `${margintop} ${marginright} ${marginbottom} ${marginleft}`};
  padding: ${({ paddingtop, paddingright, paddingbottom, paddingleft }) =>
    `${paddingtop} ${paddingright} ${paddingbottom} ${paddingleft}`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
  border-bottom: 1px solid ${fade(colors.contrastBackground, 0.1)};

  & .MuiListItemIcon-root {
    min-width: auto;
    padding: 0px 8px;
  }
`;

const useStyles = makeStyles(() => ({
  backgroundClass: {
    position: `absolute`,
    width: `100%`,
    height: `100%`,
    zIndex: -1,
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    paddingRight: `48px`,
    boxSizing: `border-box`,
  },
  listItemClass: {
    transition: `transform 0.3s ease-out`,
  },
  wrapperClass: {
    position: `relative`,
    transformOrigin: `top`,
    overflow: `hidden`,
    width: `100%`,
  },
}));

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
 * @param enableSwipeLeft? (boolean, default = false) if should enable swipe left action
 * @param onSwipedLeft? (() => void) after swiped left callback function
 * @param leftActionBackgrond? (string) left action background color hexadecimal
 * @param leftActionFontColor? (string) left action font color hexadecimal
 * @param leftActionText? (string) left action text
 * @param testId? (string) optional id for testing purpose
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
  enableSwipeLeft = false,
  onSwipedLeft,
  leftActionBackgrond,
  leftActionFontColor,
  leftActionText,
  testId,
}: ComponentProps) => {
  const threshold = 0.3;
  const classes = useStyles();
  const listElementEl = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    wrapperMaxHeight: 1000,
    diff: 0,
    dragged: false,
    dragStartX: 0,
    isAnimating: false,
    side: `left`,
    startTime: 0,
  });

  const { backgroundClass, listItemClass, wrapperClass } = classes;
  const { diff, dragged, dragStartX, side, wrapperMaxHeight } = state;

  function onDragStartTouch(event: React.TouchEvent): void {
    const touch = event.touches[0];
    const { clientX } = touch;
    setState((prevState) => ({
      ...prevState,
      dragged: true,
      dragStartX: clientX,
      isAnimating: true,
      startTime: Date.now(),
    }));
  }

  function onDragEndTouch(): void {
    if (dragged) {
      setState((prevState) => ({
        ...prevState,
        dragged: false,
      }));
      if (listElementEl.current && diff < listElementEl.current.offsetWidth * threshold * -1) {
        setState((prevState) => ({
          ...prevState,
          diff: listElementEl.current ? -listElementEl.current.offsetWidth * 2 : 0,
        }));
      } else if (listElementEl.current && diff > listElementEl.current.offsetWidth * threshold) {
        setState((prevState) => ({
          ...prevState,
          diff: listElementEl.current ? listElementEl.current.offsetWidth * 2 : 0,
        }));
      } else {
        setState((prevState) => ({ ...prevState, diff: 0 }));
      }
    }
  }

  function onTouchMove(event: React.TouchEvent): void {
    const touch = event.touches[0];
    const newDiff = touch.clientX - dragStartX;
    if (newDiff < 0) {
      setState((prevState) => ({
        ...prevState,
        diff: newDiff,
        side: `left`,
      }));
    }
  }

  function onTransitionEnd(event: React.TransitionEvent): void {
    event.persist();
    if (
      side === `left` &&
      !dragged &&
      listElementEl.current &&
      diff < listElementEl.current.offsetWidth * threshold * -1
    ) {
      setState({
        wrapperMaxHeight: 1000,
        diff: 0,
        dragged: false,
        dragStartX: 0,
        isAnimating: false,
        side: `left`,
        startTime: 0,
      });
      if (onSwipedLeft) onSwipedLeft(event);
    }
  }

  const getOpacity = (): number => {
    const opacity = parseFloat((Math.abs(diff) / 100).toFixed(2));
    if (opacity < 1) {
      return opacity;
    }
    return 1;
  };

  return enableSwipeLeft ? (
    <>
      <div
        className={wrapperClass}
        data-testid="wrapper-list-item"
        onTransitionEnd={onTransitionEnd}
        style={{
          maxHeight: wrapperMaxHeight,
        }}
      >
        <ListItem
          className={backgroundClass}
          data-testid="action-list-item"
          divider={dragged}
          style={{
            backgroundColor: leftActionBackgrond,
            color: leftActionFontColor,
            justifyContent: `flex-end`,
            opacity: state.isAnimating ? getOpacity() : 0,
          }}
        >
          {leftActionText}
        </ListItem>
        <StyledListItem
          className={listItemClass}
          data-testid={testId}
          paddingtop={paddingTop}
          paddingright={paddingRight}
          paddingbottom={paddingBottom}
          paddingleft={paddingLeft}
          margintop={marginTop}
          marginright={marginRight}
          marginbottom={marginBottom}
          marginleft={marginLeft}
          fontSize={fontSize}
          button
          onClick={onListItemClick}
          onTouchStart={onDragStartTouch}
          onTouchMove={onTouchMove}
          onTouchEnd={onDragEndTouch}
          ref={listElementEl}
          style={diff !== 0 ? { transform: `translateX(${diff}px)` } : { transform: `none` }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          {children}
          <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction>
        </StyledListItem>
      </div>
    </>
  ) : (
    <StyledListItem
      data-testid={testId}
      paddingtop={paddingTop}
      paddingright={paddingRight}
      paddingbottom={paddingBottom}
      paddingleft={paddingLeft}
      margintop={marginTop}
      marginright={marginRight}
      marginbottom={marginBottom}
      marginleft={marginLeft}
      fontSize={fontSize}
      button
    >
      <ListItemIcon>{icon}</ListItemIcon>
      {children}
      <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction>
    </StyledListItem>
  );
};
