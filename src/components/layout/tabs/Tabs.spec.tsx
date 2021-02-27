import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AppTabs } from './Tabs';
import { AppRoutes } from './../../../routes';

/*  */

describe('App Tabs Test Suite', () => {
  it('Should render a nav button for each route', () => {
    const { getByText } = render(
      <BrowserRouter>
        <AppTabs testId="appTabs" />
      </BrowserRouter>,
    );
    for (const route of AppRoutes) {
      const navBtn = getByText(route.title);
      expect(navBtn).toBeTruthy();
    }
  });

  it('Should correctly change pathname when clicking on one of the nav buttons', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AppTabs testId="appTabs" />
      </BrowserRouter>,
    );
    for (const route of AppRoutes) {
      const navBtn = getByTestId(route.testId);
      expect(navBtn).toBeTruthy();
      userEvent.click(navBtn);
      expect(location.pathname).toBe(route.path);
    }
  });
});
