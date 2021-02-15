import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('Loading component test suite', () => {
  it('Should render correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
