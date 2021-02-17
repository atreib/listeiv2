import React, { ReactChild, ReactChildren } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { fade } from '@material-ui/core/styles/colorManipulator';
import styled from 'styled-components';

interface ComponentProps {
  children: ReactChild | ReactChildren;
  onClick: () => void;
  testId?: string;
  bgColor?: string;
  fontColor?: string;
  disabled?: boolean;
  size?: 'small' | 'medium';
}

interface ButtonProps {
  bgcolor?: string;
  fontcolor?: string;
}

const StyledButton = styled(IconButton)<ButtonProps>`
  ${({ bgcolor }) =>
    bgcolor && `background-color: ${fade(bgcolor, 0.8)}; &:hover, &:focus { background-color: ${bgcolor}; } `}
  ${({ fontcolor }) => fontcolor && `color: ${fade(fontcolor, 1)};`}
`;

/**
 * Default icon button of our project
 * @param children: (ReactChild | ReactChildren) Button's content
 * @param onClick: (onClick: () => void) Function to be called on button's click
 * @param bgColor?: (string) background hexadecimal color
 * @param fontColor?: (string) font hexadecimal color
 * @param disabled?: (boolean) Is input disabled?
 * @param size?: ("small" | "medium") button size
 * @param testId?: (string) id for use on tests
 */
export const AppIconButton = ({
  children,
  onClick,
  bgColor,
  fontColor,
  disabled = false,
  size = 'medium',
  testId = '',
}: ComponentProps) => {
  return (
    <StyledButton
      data-testid={testId}
      bgcolor={bgColor}
      fontcolor={fontColor}
      disabled={disabled}
      onClick={onClick}
      size={size}
    >
      {children}
    </StyledButton>
  );
};
