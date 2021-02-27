import React from 'react';
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
import { ShoppingListModel } from './../../../models';
import { ShoppingListItem } from './ShoppingListItem';

export const HistoryPage = () => {
  const shoppingListHistory: ShoppingListModel[] = [
    {
      id: 'uuuid0',
      date: new Date(),
      products: [
        {
          id: 'uuid01',
          label: 'queijo',
          quantity: 1,
          unityPrice: 2,
          totalPrice: 2,
        },
        {
          id: 'uuid02',
          label: 'presunto',
          quantity: 1,
          unityPrice: 2.25,
          totalPrice: 2,
        },
        {
          id: 'uuid03',
          label: 'leite',
          quantity: 2,
          unityPrice: 3.1,
          totalPrice: 6.2,
        },
      ],
    },
    {
      id: 'uuuid2',
      date: new Date(),
      products: [
        {
          id: 'uuid21',
          label: 'leite',
          quantity: 1,
          unityPrice: 3.1,
          totalPrice: 3.1,
        },
      ],
    },
    {
      id: 'uuuid3',
      date: new Date(),
      products: [],
    },
  ];

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
