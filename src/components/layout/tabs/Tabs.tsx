import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { colors } from '../../../helpers/theme';
import { LogoIcon, HistoryIcon } from '../../utils/icons';

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

export const AppTabs = () => {
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setValue(newValue);
    console.log('newValue: ', newValue);
    switch (newValue) {
      case 0: // First button: shopping list
        history.push('/');
        break;
      case 1: // Second button: history
        history.push('/history');
        break;
    }
  };

  return (
    <TabsWrapper>
      <Tabs
        TabIndicatorProps={{ style: { background: colors.primary } }}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <AppTab icon={<LogoIcon />} label="Lista de compras" />
        <AppTab icon={<HistoryIcon />} label="Histórico" />
      </Tabs>
    </TabsWrapper>
  );
};
