import React from 'react';
import { AppDialog } from './Dialog';
import { AppButton } from './../buttons/AppButton';
import { colors } from '../../../helpers/theme';

interface ComponentProps {
  title: string;
  description: string;
  successBtnText: string;
  fnSuccess: () => unknown;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  testId?: string;
}

/**
 * Creates a dialog window to prompt something from user
 * @param title: (string) title/text of the dialog
 * @param description: (string) description/text of the dialog
 * @param successBtnText: (string) text of the "ok button"
 * @param fnSuccess: ((typedValue: string) => unknown) callback function to be called when the "ok button" is pressed
 * @param dialogOpen: (boolean) boolean to "is dialog opened?"
 * @param setDialogOpen: (React.Dispatch<React.SetStateAction<boolean>>) react hooks function to set the "is dialog opened?" value
 * @param testId?: (string) optional id for testing purposal
 */
export const AppConfirmDialog = ({
  title,
  description,
  successBtnText,
  fnSuccess,
  dialogOpen,
  setDialogOpen,
  testId = '',
}: ComponentProps) => {
  const BtnConfirm = () => (
    <AppButton
      testId="confirmDialogButton"
      bgColor={colors.primary}
      fontColor={colors.contrastPrimary}
      onClick={() => fnSuccess()}
    >
      {successBtnText}
    </AppButton>
  );

  return (
    <div>
      <AppDialog
        testId={testId}
        title={title}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        ExtraButtons={[BtnConfirm]}
        cancelBtnText={'Cancelar'}
      >
        {description}
      </AppDialog>
    </div>
  );
};
