import React, { ReactChild, ReactChildren } from 'react';
import styled from 'styled-components';
import { AppTabs } from './tabs';

interface ComponentProps {
  children: ReactChild | ReactChildren;
}

const AppLayoutContent = styled.div`
  padding-bottom: calc(76px + 8px);
`;

/**
 * Our app's layout
 * @param children: (ReactChild | ReactChildren) our layout content
 */
export const AppLayout = ({ children }: ComponentProps) => {
  return (
    <>
      <AppLayoutContent data-testid="appLayoutContent">{children}</AppLayoutContent>
      <AppTabs testId="appLayoutNavTabs" />
    </>
  );
};
