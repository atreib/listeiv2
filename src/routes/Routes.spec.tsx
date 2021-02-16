import React from 'react';
import { AppRoutes as sut } from './Routes';

describe('Routes Test SUite', () => {
  it('SHould return an array with correct type', () => {
    expect(sut).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: expect.any(String),
          title: expect.any(String),
          icon: expect.anything(),
          component: expect.anything(),
        }),
      ]),
    );
  });

  it('Should have our Dashboard page', async () => {
    expect(
      await sut.findIndex(
        async (x) => x.component === (await React.lazy(() => import('./../components/pages/dashboard/DashboardPage'))),
      ),
    ).toBeGreaterThan(-1);
  });
});
