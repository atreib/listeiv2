import React, { ReactChild, ReactChildren } from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';

interface ComponentProps {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[] | undefined;
}

const StyledList = styled(List)`
  margin: 0;
  padding: 0;
`;

/**
 * Our default List component
 * @param children?: (ReactChild | ReactChildren | ReactChild[] | ReactChildren[]) list of list's children
 */
export const AppList = ({ children }: ComponentProps) => {
  return <StyledList dense>{children}</StyledList>;
};
