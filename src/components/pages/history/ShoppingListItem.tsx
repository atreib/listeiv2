import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ShoppingListContext } from '../../../contexts';
import { colors } from '../../../helpers/theme';
import { ShoppingListModel } from '../../../models';
import { AppConfirmDialog, AppDialog, AppIconButton, AppListItem } from '../../utils';
import { LeftIcon } from './HistoryPage.styles';

interface ComponentProps {
  shoppingList: ShoppingListModel;
}

/**
 * Shopping list "list item" component
 * * Creates a list item for this shopping list
 * * Open the shopping list in homepage when user slides to the left
 * * Show date and products' quantity of the shopping list
 * @param shoppingList: (ShoppingListModel) a shopping list
 * @returns (AppListItem) shopping list
 */
export const ShoppingListItem = ({ shoppingList }: ComponentProps) => {
  const [isOpenShoppingListConfirmOpen, setIsOpenShoppingListConfirmOpen] = useState(false);
  const [isShoppingListDialogOpen, setIsShoppingListDialogOpen] = useState(false);
  const { setOpenedList } = useContext(ShoppingListContext);
  const history = useHistory();

  // Set shoppingList as the opened one
  const onOpenOldList = () => {
    setOpenedList(shoppingList);
    setIsOpenShoppingListConfirmOpen(false);
    // Redirect to homepage
    history.push('/');
  };

  // we are creating this invisible
  // button inside shoppingList itemlist
  // so we can test what happens when we try
  // to open an old shopping list
  // (because testing library hasn't a swipe simulator)
  const openShoppingListBtn = (
    <AppIconButton testId={`openList_${shoppingList.id}`} onClick={() => setIsOpenShoppingListConfirmOpen(true)}>
      &nbsp;
    </AppIconButton>
  );

  return (
    <>
      {isShoppingListDialogOpen && (
        <AppDialog
          testId={'shoppingListProductsDialog'}
          dialogOpen={isShoppingListDialogOpen}
          setDialogOpen={setIsShoppingListDialogOpen}
          cancelBtnText={'Fechar'}
          title={`Lista de ${new Date(shoppingList.date).toLocaleDateString()}`}
        >
          <>
            {shoppingList.products && shoppingList.products.length > 0 && (
              <ul>
                {shoppingList.products.map((product) => (
                  <li key={product.id}>
                    {product.quantity}x {product.label}
                  </li>
                ))}
              </ul>
            )}
            {shoppingList.products.length <= 0 && 'Não há produtos nesta lista'}
          </>
        </AppDialog>
      )}
      {isOpenShoppingListConfirmOpen && (
        <AppConfirmDialog
          title="Você tem certeza?"
          description="Você deseja abrir esta lista antiga? Sua lista atual será apagada..."
          dialogOpen={isOpenShoppingListConfirmOpen}
          setDialogOpen={setIsOpenShoppingListConfirmOpen}
          successBtnText="Abrir lista"
          testId="openOldListConfirm"
          cancelTestId="openOldListConfirmCancelBtn"
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
        onListItemClick={() => setIsShoppingListDialogOpen(true)}
        leftActionBackgrond={colors.primary}
        leftActionFontColor={colors.contrastPrimary}
        leftActionText={'Carregar'}
        enableSwipeLeft={true}
        onSwipedLeft={() => setIsOpenShoppingListConfirmOpen(true)}
        testId={shoppingList.id}
      >
        <>
          {openShoppingListBtn}
          {new Date(shoppingList.date).toLocaleDateString()} ({shoppingList.products.length} produtos)
        </>
      </AppListItem>
    </>
  );
};
