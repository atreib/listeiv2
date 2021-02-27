import React, { ReactChild, ReactChildren } from 'react';
import styled from 'styled-components';
import { AppTabs } from './tabs';

interface ComponentProps {
  children: ReactChild | ReactChildren;
}

const AppLayoutContent = styled.div`
  padding-bottom: calc(76px + 8px);
`;

export const AppLayout = ({ children }: ComponentProps) => {
  return (
    <>
      <AppLayoutContent>{children}</AppLayoutContent>
      <AppTabs />
    </>
  );
};
