import { shallow } from 'enzyme/build/index';
import React from 'react';
import TopNavigation from '../../js/component/Navigation/TopNavigation';

describe('TopNavigation', () => {
  describe('render', () => {
    it('should have 3 division', () => {
      const component = shallow(<TopNavigation />);
      expect(component.find('div').length).toBeGreaterThan(1);
    });
    it('should have 1 button acces menu', () => {
      const component = shallow(<TopNavigation />);
      expect(component.find('button').length).toBe(1);
    });
    it('button must have no text', () => {
      const component = shallow(<TopNavigation />);
      expect(component.find('button').text()).toEqual('');
    });
    it('button must toggle class active', () => {
      const mockFunction = jest.fn();
      const component = shallow(<TopNavigation pressMenuButton={true} onClickMenu={mockFunction} />);
      const button = component.find('#sidebarCollapse');
      button.simulate('click');
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });
  });
});

