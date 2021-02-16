import { TextField } from '@material-ui/core';
import React from 'react';

interface ComponentProps {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  value?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  errorHelperText?: string;
}

/**
 * Default input/TextField of our project
 * @param options (ComponentProps) {
 *  * label: (string) Input floating label
 *  * setValue: (React.Dispatch<React.SetStateAction<string | undefined>>) Set state of input value
 *  * value?: (string) Input value
 *  * placeholder?: (string) Input placeholder
 *  * type?: (string) Input type
 *  * required?: (boolean) Is input required?
 *  * fullWidth?: (boolean) Should input fill full width?
 *  * error?: (boolean) Is input with error?
 *  * errorHelperText?: (string) Description of input error
 *
 * }
 */
export const AppInput = ({
  label,
  setValue,
  value,
  placeholder = '',
  type = 'text',
  required = false,
  fullWidth = false,
  error = false,
  errorHelperText = '',
}: ComponentProps) => {
  return (
    <TextField
      error={error}
      helperText={errorHelperText}
      required={required}
      fullWidth={fullWidth}
      type={type}
      placeholder={placeholder}
      value={value}
      label={label}
      variant="outlined"
      onChange={(event) => setValue(event.target.value)}
    />
  );
};
