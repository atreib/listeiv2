import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

interface ComponentProps {
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  clickHandler?: () => void;
  checked: boolean;
  edge?: 'start' | 'end';
  testId?: string;
}

/**
 * Default checkbox of our project
 * @param setChecked: (React.Dispatch<React.SetStateAction<boolean>>) set state for is check checked
 * @param clickHandler?: (() => void) checkbox click callback
 * @param checked: (boolean) if is checkbox checked
 * @param edge?: ('start' | 'end') if checkbox is on component's start or end (for margin purpose)
 * @param testId?: (string) optional id for testing purpose
 */
export const AppCheckbox = ({ edge, setChecked, checked, testId, clickHandler }: ComponentProps) => {
  return (
    <Checkbox
      data-testid={testId}
      edge={edge}
      onClick={() => clickHandler && clickHandler()}
      onChange={() => setChecked(!checked)}
      checked={checked}
    />
  );
};
