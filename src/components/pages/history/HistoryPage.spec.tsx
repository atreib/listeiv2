import React from 'react';
import { render } from '@testing-library/react';
import { HistoryPage } from './HistoryPage';

describe('History Page Test Suite', () => {
  it('Should render page', () => {
    const { getByText } = render(<HistoryPage />);
    const headerTitle = getByText('Histórico');
    expect(headerTitle).toBeTruthy();
  });
});
