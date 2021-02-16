import React, { ReactChild, ReactChildren } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { StylesProvider } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import styled from 'styled-components';

interface ComponentProps {
  children: ReactChild | ReactChildren;
  onClick: () => void;
  bgColor?: string;
  fontColor?: string;
  disabled?: boolean;
  size?: 'small' | 'medium';
}

interface ButtonProps {
  bgColor?: string;
  fontColor?: string;
}

const StyledButton = styled(IconButton)<ButtonProps>`
  ${({ bgColor }) => bgColor && `background-color: ${fade(bgColor, 0.5)}; &:hover { background-color: ${bgColor}; } `}
  ${({ fontColor }) => fontColor && `color: ${fade(fontColor, 1)};`}
`;

/**
 * Default icon button of our project
 * @param children: (ReactChild | ReactChildren) Button's content
 * @param onClick: (onClick: () => void) Function to be called on button's click
 * @param bgColor?: (string) background hexadecimal color
 * @param fontColor?: (string) font hexadecimal color
 * @param disabled?: (boolean) Is input disabled?
 * @param size?: ("small" | "medium") button size
 */
export const AppIconButton = ({
  children,
  onClick,
  bgColor,
  fontColor,
  disabled = false,
  size = 'medium',
}: ComponentProps) => {
  return (
    <StylesProvider injectFirst>
      <StyledButton bgColor={bgColor} fontColor={fontColor} disabled={disabled} onClick={onClick} size={size}>
        {children}
      </StyledButton>
    </StylesProvider>
  );
};
