import React from 'react';
import { AppLayout } from './AppLayout';
import { render } from '@testing-library/react';

describe('App layout main structure', () => {
  it('Should correctly render our tabs structure', () => {
    const { getByTestId } = render(<AppLayout>teste</AppLayout>);
    const tabs = getByTestId('appLayoutNavTabs');
    expect(tabs).toBeTruthy();
  });

  it('Should correctly render our content structure', () => {
    const { getByTestId } = render(<AppLayout>teste</AppLayout>);
    const content = getByTestId('appLayoutContent');
    expect(content).toBeTruthy();
  });

  it('Should render content structure with correct content value', () => {
    const { getByTestId } = render(<AppLayout>teste</AppLayout>);
    const content = getByTestId('appLayoutContent');
    expect(content).toBeTruthy();
    console.log('content.innerHTML: ', content.innerHTML);
    expect(content.innerHTML).toContain('teste');
  });
});
