import { TextField } from '@material-ui/core';
import React from 'react';

interface ComponentProps {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  value?: string;
  placeholder?: string;
  type?: string;
}

export const AppInput = ({ label, setValue, value, placeholder = '', type = 'text' }: ComponentProps) => {
  return (
    <TextField
      type={type}
      placeholder={placeholder}
      value={value}
      label={label}
      variant="outlined"
      onChange={(event) => setValue(event.target.value)}
    />
  );
};
