import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

interface ComponentProps {
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  checked: boolean;
  edge?: 'start' | 'end';
}

export const AppCheckbox = ({ edge, setChecked, checked }: ComponentProps) => {
  return <Checkbox edge={edge} onChange={() => setChecked(!checked)} checked={checked} />;
};
