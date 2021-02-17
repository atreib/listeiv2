import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

interface ComponentProps {
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  checked: boolean;
  edge?: 'start' | 'end';
  testId?: string;
}

export const AppCheckbox = ({ edge, setChecked, checked, testId }: ComponentProps) => {
  return <Checkbox data-testid={testId} edge={edge} onChange={() => setChecked(!checked)} checked={checked} />;
};
