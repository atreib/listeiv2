import React, { ReactChild, ReactChildren } from 'react';
import styled from 'styled-components';

interface ComponentProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  children: ReactChild | ReactChildren;
}

interface LoadingWrapperProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
}

const LoadingWrapper = styled.div<LoadingWrapperProps>`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '100%')};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${(props) => (props.backgroundColor ? props.backgroundColor : '#ccc')};
`;

/**
 * Our default app loading component
 * @param chilren: (ReactChild | ReactChildren) content of loading wrapper
 * @param width?: (string) loading width (use "px" or "%"; default: 100%)
 * @param height?: (string) loading width (use "px" or "%"; default: 100%)
 * @param backgroundColor?: (string) loading background color in hexadecimal
 */
export const Loading = ({ children, width, height, backgroundColor }: ComponentProps) => {
  return (
    <LoadingWrapper data-testid="loadingwrapper" width={width} height={height} backgroundColor={backgroundColor}>
      {children}
    </LoadingWrapper>
  );
};
