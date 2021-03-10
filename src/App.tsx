import React, { Suspense } from 'react';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NotFoundPage } from './components/pages';
import { Loading } from './components/utils';
import { AppRoutes, RoutesModel } from './routes';
import { ShoppingListProvider, ShoppingListHistoryProvider } from './contexts';
import { AppLayout } from './components/layout';

const ContainerDiv = styled.div`
  height: 100%;
`;

function App() {
  return (
    <StylesProvider injectFirst>
      <ContainerDiv className="App">
        <ShoppingListHistoryProvider>
          <ShoppingListProvider>
            <Router>
              <AppLayout>
                <Suspense fallback={<Loading>Carregando...</Loading>}>
                  <Switch>
                    {AppRoutes &&
                      AppRoutes.map((route: RoutesModel) => (
                        <Route key={route.path} path={route.path} exact component={route.component} />
                      ))}
                    <Route component={NotFoundPage} />
                  </Switch>
                </Suspense>
              </AppLayout>
            </Router>
          </ShoppingListProvider>
        </ShoppingListHistoryProvider>
      </ContainerDiv>
    </StylesProvider>
  );
}

export default App;
