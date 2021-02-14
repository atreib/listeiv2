import React, { Suspense } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NotFoundPage } from './components/pages';
import { AppRoutes, RoutesModel } from './routes';
import { Loading } from './components/utils/loading';

const ContainerDiv = styled.div`
  height: 100%;
`;

function App() {
  return (
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
  );
}

export default App;
