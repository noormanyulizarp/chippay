import { shallow } from 'enzyme/build/index';
import React from 'react';
import SideNavigation from '../../js/component/Navigation/SideNavigation';

describe('SideNavigation', () => {
  describe('render', () => {
    it('should have 3 division', () => {
      const component = shallow(<SideNavigation />);
      expect(component.find('div').length).toBe(1);
    });
  });
  describe('render', () => {
    it('should have 3 ul list', () => {
      const component = shallow(<SideNavigation />);
      expect(component.find('ul').length).toEqual(1);
    });
  });
  describe('have text chippay cp', () => {
    it('should have 3 division', () => {
      const component = shallow(<SideNavigation />);
      expect(component.find('div').text()).toEqual('ChippayCP');
    });
  });
});

