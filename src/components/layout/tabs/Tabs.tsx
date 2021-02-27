import React from 'react';
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
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setValue(newValue);
    const selectedPage = AppRoutes.length - 1 >= newValue ? AppRoutes[newValue] : undefined;
    if (selectedPage) history.push(selectedPage.path);
  };

  return (
    <TabsWrapper data-testid={testId}>
      <Tabs
        TabIndicatorProps={{ style: { background: colors.primary } }}
        value={value}
        onChange={handleChange}
        variant="fullWidth"
      >
        {AppRoutes && AppRoutes.map((route, i) => <AppTab key={i} icon={route.Icon} label={route.title} />)}
      </Tabs>
    </TabsWrapper>
  );
};
