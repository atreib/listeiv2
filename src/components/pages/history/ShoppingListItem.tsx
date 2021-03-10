import React, { useState } from 'react';
import { colors } from '../../../helpers/theme';
import { ShoppingListModel } from '../../../models';
import { AppConfirmDialog, AppListItem } from '../../utils';
import { LeftIcon } from './HistoryPage.styles';

interface ComponentProps {
  shoppingList: ShoppingListModel;
}

export const ShoppingListItem = ({ shoppingList }: ComponentProps) => {
  const [isLoadingOldShoppingList, setIsLoadingOldShoppingList] = useState(false);

  const onOpenOldList = () => {
    return;
  };

  return (
    <>
      {isLoadingOldShoppingList && (
        <AppConfirmDialog
          title="Você tem certeza?"
          description="Você deseja abrir esta lista antiga? Sua lista atual será apagada..."
          dialogOpen={isLoadingOldShoppingList}
          setDialogOpen={setIsLoadingOldShoppingList}
          successBtnText="ABrir lista"
          testId="openOldListConfirm"
          fnSuccess={() => onOpenOldList()}
        />
      )}
      <AppListItem
        icon={<LeftIcon fontSize="small" />}
        key={shoppingList.id}
        paddingTop="16px"
        paddingBottom="16px"
        paddingLeft="0px"
        fontSize="1.3rem"
        leftActionBackgrond={colors.primary}
        leftActionFontColor={colors.contrastPrimary}
        leftActionText={'Carregar'}
        enableSwipeLeft={true}
        onSwipedLeft={() => setIsLoadingOldShoppingList(true)}
      >
        <>
          {shoppingList.date.toLocaleDateString()} ({shoppingList.products.length} produtos)
        </>
      </AppListItem>
    </>
  );
};
