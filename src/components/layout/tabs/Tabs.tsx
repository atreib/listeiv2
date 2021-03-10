import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Tab, Tabs } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { colors } from '../../../helpers/theme';
import { AppRoutes } from './../../../routes';

interface ComponentProps {
  testId: string;
}

const TabsWrapper = styled.div`
  background: ${colors.background};
  padding-top: 4px;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 2;
  box-shadow: 10px 10px 10px 5px rgba(0, 0, 0, 0.5);
`;

const AppTab = styled(Tab)`
  &.Mui-selected {
    color: ${colors.primary};
  }
`;

/**
 * Our app's navigation tabs
 * @param testId: (string) id for testing purpose
 */
export const AppTabs = ({ testId }: ComponentProps) => {
  const openedPageId = AppRoutes.findIndex((x) => x.path === location.pathname);
  const history = useHistory();
  const [value, setValue] = React.useState(openedPageId);

  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setValue(newValue);
    if (AppRoutes.length - 1 >= newValue) {
      const selectedPage = AppRoutes[newValue];
      if (selectedPage) history.push(selectedPage.path);
    }
  };

  useEffect(() => {
    history.listen(() => {
      const index = AppRoutes.findIndex((x) => x.path === history.location.pathname);
      if (index >= 0 && index <= AppRoutes.length) setValue(index);
    });
  }, [history]);

  return (
    <TabsWrapper data-testid={testId}>
      <Tabs
        TabIndicatorProps={{ style: { background: colors.primary } }}
        value={value}
        onChange={handleChange}
        variant="fullWidth"
      >
        {AppRoutes &&
          AppRoutes.map((route, i) => (
            <AppTab data-testid={route.testId} key={i} icon={route.Icon} label={route.title} />
          ))}
      </Tabs>
    </TabsWrapper>
  );
};
