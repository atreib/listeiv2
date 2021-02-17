import React, { Suspense } from 'react';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NotFoundPage } from './components/pages';
import { AppRoutes, RoutesModel } from './routes';
import { Loading } from './components/utils/loading';
import { colors } from './helpers/theme';

const ContainerDiv = styled.div`
  height: 100%;
  background-color: ${colors.background};
  color: ${colors.contrastBackground};
`;

function App() {
  return (
    <StylesProvider injectFirst>
      <ContainerDiv className="App">
        <Router>
          <Suspense fallback={<Loading>Carregando...</Loading>}>
            <Switch>
              {AppRoutes &&
                AppRoutes.map((route: RoutesModel) => (
                  <Route key={route.path} path={route.path} exact component={route.component} />
                ))}
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </Router>
      </ContainerDiv>
    </StylesProvider>
  );
}

export default App;
