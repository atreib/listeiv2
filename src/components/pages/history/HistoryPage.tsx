import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  ShoppingListHistory,
  HistoryIcon,
  ListWrapper,
  AppList,
  AppIconButton,
  TitleWrapper,
  PageTitle,
} from './HistoryPage.styles';
import { colors } from './../../../helpers/theme';
import { ShoppingListItem } from './ShoppingListItem';
import { ShoppingListHistoryContext } from '../../../contexts';

export const HistoryPage = () => {
  const { history: shoppingListHistory } = useContext(ShoppingListHistoryContext);

  return (
    <ShoppingListHistory>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Histórico</title>
        <style>{`body { background-color: ${colors.background}; color: ${colors.contrastBackground}; }`}</style>
      </Helmet>
      <PageTitle>
        <TitleWrapper>
          <AppIconButton bgColor={colors.primary}>
            <HistoryIcon />
          </AppIconButton>
          Histórico
        </TitleWrapper>
      </PageTitle>
      <ListWrapper>
        {shoppingListHistory && (
          <AppList>
            {shoppingListHistory.map((shoppingList) => (
              <ShoppingListItem key={shoppingList.id} shoppingList={shoppingList} />
            ))}
          </AppList>
        )}
        {(!shoppingListHistory || shoppingListHistory.length === 0) &&
          'Ops, você ainda não criou nenhuma lista de compras'}
      </ListWrapper>
    </ShoppingListHistory>
  );
};

export default HistoryPage;
