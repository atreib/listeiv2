import { TextField } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../helpers/theme';

interface ComponentProps {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  errorHelperText?: string;
  testId?: string;
}

const StyledTextField = styled(TextField)`
  & .Mui-focused {
    color: ${colors.primary};
    border-color: ${colors.primary} !important;
  }

  & input {
    color: ${colors.contrastBackground};
  }

  & fieldset {
    border-color: ${colors.primary} !important;
  }
`;

/**
 * Default input/TextField of our project
 * @param label: (string) Input floating label
 * @param setValue: (React.Dispatch<React.SetStateAction<string>>) Set state of input value
 * @param value?: (string) Input value
 * @param placeholder?: (string) Input placeholder
 * @param type?: (string) Input type
 * @param required?: (boolean) Is input required?
 * @param fullWidth?: (boolean) Should input fill full width?
 * @param error?: (boolean) Is input with error?
 * @param errorHelperText?: (string) Description of input error
 * @param testId?: (string) Optional id for testing purpose
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
  testId = '',
}: ComponentProps) => {
  return (
    <StyledTextField
      data-testid={testId}
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
