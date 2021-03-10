import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ShoppingListContext } from '../../../contexts';
import { colors } from '../../../helpers/theme';
import { ShoppingListModel } from '../../../models';
import { AppConfirmDialog, AppListItem } from '../../utils';
import { LeftIcon } from './HistoryPage.styles';

interface ComponentProps {
  shoppingList: ShoppingListModel;
}

export const ShoppingListItem = ({ shoppingList }: ComponentProps) => {
  const [isLoadingOldShoppingList, setIsLoadingOldShoppingList] = useState(false);
  const { setOpenedList } = useContext(ShoppingListContext);
  const history = useHistory();

  const onOpenOldList = () => {
    setOpenedList(shoppingList);
    setIsLoadingOldShoppingList(false);
    history.push('/');
  };

  return (
    <>
      {isLoadingOldShoppingList && (
        <AppConfirmDialog
          title="Você tem certeza?"
          description="Você deseja abrir esta lista antiga? Sua lista atual será apagada..."
          dialogOpen={isLoadingOldShoppingList}
          setDialogOpen={setIsLoadingOldShoppingList}
          successBtnText="Abrir lista"
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
          {new Date(shoppingList.date).toLocaleDateString()} ({shoppingList.products.length} produtos)
        </>
      </AppListItem>
    </>
  );
};
