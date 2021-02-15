import React from 'react';
import { shallow } from 'enzyme';
import { Loading } from './Loading';

describe('Loading component test suite', () => {
  let mockChildren: JSX.Element;

  beforeEach(() => {
    mockChildren = <b>Mock</b>;
  });

  it('Should render correctly', () => {
    const wrapper = shallow(<Loading>{mockChildren}</Loading>);
    expect(wrapper).toMatchSnapshot();
  });
});
