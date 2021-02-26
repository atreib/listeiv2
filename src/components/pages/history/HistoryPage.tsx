import React from 'react';
import { Helmet } from 'react-helmet';
import {
  ShoppingListHistory,
  LogoIcon,
  ListWrapper,
  AppList,
  AppIconButton,
  TitleWrapper,
  PageTitle,
} from './HistoryPage.styles';
import { colors } from './../../../helpers/theme';
import { ShoppingListModel } from './../../../models';

export const HistoryPage = () => {
  const products: ShoppingListModel[] = [];

  return (
    <ShoppingListHistory>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Listei</title>
        <style>{`body { background-color: ${colors.background}; color: ${colors.contrastBackground}; }`}</style>
      </Helmet>
      <PageTitle>
        <TitleWrapper>
          <AppIconButton bgColor={colors.primary}>
            <LogoIcon />
          </AppIconButton>
          Histórico
        </TitleWrapper>
      </PageTitle>
      <ListWrapper>
        {products && (
          <AppList>
            {products.map((product) => (
              <div key={product.id}>{product.date}</div>
            ))}
          </AppList>
        )}
        {(!products || products.length === 0) && 'Não há nada no histórico'}
      </ListWrapper>
    </ShoppingListHistory>
  );
};

export default HistoryPage;
