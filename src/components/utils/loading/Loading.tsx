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

/*
	LoadingWrapper component

	Goal: Creates a fully-centralized with darker background loading panel
	Params (ComponentProps interface):
		- width?: (optional) width of our loading panel
		- height?: (optional) height of our loading panel
		- children: our loading panel content is a children element - react element
*/

const LoadingWrapper = styled.div<LoadingWrapperProps>`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '100%')};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${(props) => (props.backgroundColor ? props.backgroundColor : '#ccc')};
`;
LoadingWrapper.displayName = 'LoadingWrapper';

export const Loading = ({ children, width, height, backgroundColor }: ComponentProps) => {
  return (
    <LoadingWrapper width={width} height={height} backgroundColor={backgroundColor}>
      {children}
    </LoadingWrapper>
  );
};
