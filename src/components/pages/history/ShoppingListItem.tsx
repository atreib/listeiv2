import React from 'react';
import { colors } from '../../../helpers/theme';
import { ShoppingListModel } from '../../../models';
import { AppListItem } from '../../utils';
import { LeftIcon } from './HistoryPage.styles';

interface ComponentProps {
  shoppingList: ShoppingListModel;
}

export const ShoppingListItem = ({ shoppingList }: ComponentProps) => {
  return (
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
      onSwipedLeft={() => {
        return;
      }}
    >
      <>
        {shoppingList.date.toLocaleDateString()} ({shoppingList.products.length} produtos)
      </>
    </AppListItem>
  );
};
