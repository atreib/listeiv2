import React, { ReactChild, ReactChildren } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AppButton } from './../buttons';
import { colors } from './../../../helpers/theme/colors';

interface ComponentProps {
  title: string;
  children: ReactChild | ReactChildren;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ExtraButtons?: (() => JSX.Element)[];
  cancelBtnText?: string;
}

const DialogContentWrapper = styled(DialogContent)`
  margin-bottom: 12px;
  font-size: 1rem;
  overflow-x: hidden;
`;

/**
 * Creates our own dialog component, based on Material UI's dialog
 * @param title: title of our dialog component
 * @param children: our dialog content (as a child element - react element)
 * @param dialogOpen: "is dialog opened?"
 * @param setDialogOpen: react hooks "set function" to "is dialog opened?"
 * @param ExtraButtons?: (optional) array of functions that return a JSX.Element (our dialog buttons)
 * @param cancelBtnText?: (optional) text of the cancel button
 */
export const AppDialog = ({
  title,
  children,
  dialogOpen,
  setDialogOpen,
  ExtraButtons,
  cancelBtnText,
}: ComponentProps) => {
  if (!cancelBtnText) cancelBtnText = 'Fechar';

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        scroll="paper" // enables scroll inside dialog
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContentWrapper dividers={true}>{children}</DialogContentWrapper>
        <DialogActions>
          <AppButton bgColor={colors.background} fontColor={colors.contrastBackground} onClick={handleClose}>
            {cancelBtnText}
          </AppButton>
          {ExtraButtons && ExtraButtons.map((Btn, i) => <Btn key={i} />)}
        </DialogActions>
      </Dialog>
    </div>
  );
};
