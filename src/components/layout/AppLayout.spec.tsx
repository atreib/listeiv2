import React from 'react';
import { AppLayout } from './AppLayout';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('App layout main structure', () => {
  it('Should correctly render our tabs structure', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AppLayout>teste</AppLayout>
      </BrowserRouter>,
    );
    const tabs = getByTestId('appLayoutNavTabs');
    expect(tabs).toBeTruthy();
  });

  it('Should correctly render our content structure', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AppLayout>teste</AppLayout>
      </BrowserRouter>,
    );
    const content = getByTestId('appLayoutContent');
    expect(content).toBeTruthy();
  });

  it('Should render content structure with correct content value', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AppLayout>teste</AppLayout>
      </BrowserRouter>,
    );
    const content = getByTestId('appLayoutContent');
    expect(content).toBeTruthy();
    expect(content.innerHTML).toContain('teste');
  });
});
