import React from 'react';
import { shallow } from 'enzyme';
import { DashboardPage } from './DashboardPage';

describe('Dashboard page testes', () => {
  it('Should render correctly', () => {
    const component = shallow(<DashboardPage />);
    expect(component).toMatchSnapshot();
  });

  it('Should show page name on h1', () => {
    const component = shallow(<DashboardPage />);
    const z = component.find('h1').length;
    expect(z).toBe(1);
  });
});
