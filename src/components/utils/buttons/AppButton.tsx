import React, { ReactChild, ReactChildren } from 'react';
import Button from '@material-ui/core/Button';
import { fade } from '@material-ui/core/styles/colorManipulator';
import styled from 'styled-components';

interface ComponentProps {
  children: ReactChild | ReactChildren;
  onClick: () => void;
  bgColor?: string;
  fontColor?: string;
  icon?: Node;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  testId?: string;
}

interface ButtonProps {
  bgcolor?: string;
  fontcolor?: string;
}

const StyledButton = styled(Button)<ButtonProps>`
  ${({ bgcolor }) =>
    bgcolor && `background-color: ${fade(bgcolor, 0.8)}; &:hover, &:focus { background-color: ${bgcolor}; } `}
  ${({ fontcolor }) => fontcolor && `color: ${fade(fontcolor, 1)};`}
`;

/**
 * Default button of our project
 * @param children: (ReactChild | ReactChildren) Button's content
 * @param onClick: (onClick: () => void) Function to be called on button's click
 * @param bgColor?: (string) background hexadecimal color
 * @param fontColor?: (string) font hexadecimal color
 * @param icon?: (Node) Icon to insert on the start of the button
 * @param disabled?: (boolean) Is input disabled?
 * @param fullWidth?: (boolean) Should input fill full width?
 * @param size?: ("small" | "medium" | "large") button size
 * @param testId?: (string) id used on automated tests
 */
export const AppButton = ({
  children,
  onClick,
  bgColor,
  fontColor,
  icon,
  disabled = false,
  fullWidth = false,
  size = 'medium',
  testId = '',
}: ComponentProps) => {
  return (
    <StyledButton
      bgcolor={bgColor}
      fontcolor={fontColor}
      disabled={disabled}
      onClick={onClick}
      fullWidth={fullWidth}
      size={size}
      startIcon={icon}
      variant="contained"
      data-testid={testId}
    >
      {children}
    </StyledButton>
  );
};
