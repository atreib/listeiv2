import React, { useState } from 'react';
import { AppDialog } from './Dialog';
import { AppButton } from './../buttons/AppButton';
import { AppInput } from '../inputs';
import { colors } from '../../../helpers/theme';
import styled from 'styled-components';

interface ComponentProps {
  title: string;
  description: string;
  inputLabel: string;
  successBtnText: string;
  fnSuccess: (typedValue: string) => unknown;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValue?: string;
  placeholder?: string;
  type?: 'text' | 'number';
}

const InputWrapper = styled.div`
  margin: 24px 0 12px 0;
`;

/**
 * Creates a dialog window to prompt something from user
 * @param title: (string) title/text of the dialog
 * @param description: (string) description/text of the dialog
 * @param inputLabel: (string) label of the prompt input
 * @param successBtnText: (string) text of the "ok button"
 * @param fnSuccess: ((typedValue: string) => unknown) callback function to be called when the "ok button" is pressed
 * @param dialogOpen: (boolean) boolean to "is dialog opened?"
 * @param setDialogOpen: (React.Dispatch<React.SetStateAction<boolean>>) react hooks function to set the "is dialog opened?" value
 * @param defaultValue?: (string) input default value
 * @param placeholder?: (string) placeholder of the prompt input
 * @param type?: ('text' | 'number') type of the prompt input
 */
export const AppPromptDialog = ({
  title,
  description,
  inputLabel,
  successBtnText,
  fnSuccess,
  dialogOpen,
  setDialogOpen,
  defaultValue,
  placeholder,
  type = 'text',
}: ComponentProps) => {
  const [value, setValue] = useState<string>(defaultValue ?? '');
  const BtnConfirm = () => (
    <AppButton bgColor={colors.primary} fontColor={colors.contrastPrimary} onClick={() => fnSuccess(value)}>
      {successBtnText}
    </AppButton>
  );

  return (
    <div>
      <AppDialog
        title={title}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        ExtraButtons={[BtnConfirm]}
        cancelBtnText={'Cancelar'}
      >
        <>
          <div>{description}</div>
          <InputWrapper>
            <AppInput
              type={type}
              placeholder={placeholder}
              fullWidth={true}
              required={true}
              value={value}
              setValue={setValue}
              label={inputLabel}
            />
          </InputWrapper>
        </>
      </AppDialog>
    </div>
  );
};
