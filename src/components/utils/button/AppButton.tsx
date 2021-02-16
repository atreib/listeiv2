import React, { ReactChild, ReactChildren } from 'react';
import Button from '@material-ui/core/Button';

interface ComponentProps {
  children: ReactChild | ReactChildren;
  onClick: () => void;
  icon?: Node;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Default button of our project
 * @param options (ComponentProps) {
 *  * children: (ReactChild | ReactChildren) Button's content
 *  * onClick: (onClick: () => void) Function to be called on button's click
 *  * icon?: (Node) Icon to insert on the start of the button
 *  * disabled?: (boolean) Is input disabled?
 *  * fullWidth?: (boolean) Should input fill full width?
 *  * size?: ("small" | "medium" | "large") button size
 *
 * }
 */
export const AppButton = ({
  children,
  onClick,
  icon,
  disabled = false,
  fullWidth = false,
  size = 'medium',
}: ComponentProps) => {
  return (
    <Button disabled={disabled} onClick={onClick} fullWidth={fullWidth} size={size} startIcon={icon} variant="outlined">
      {children}
    </Button>
  );
};
