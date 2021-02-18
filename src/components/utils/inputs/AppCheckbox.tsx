import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

interface ComponentProps {
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  clickHandler?: () => void;
  checked: boolean;
  edge?: 'start' | 'end';
  testId?: string;
}

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
