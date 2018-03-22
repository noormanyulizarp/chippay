import { shallow } from 'enzyme';
import React from 'react';
import CheckPayee from '../../js/component/Payee/CheckPayee';
import '../../setupTests';

describe('CheckPayee', () => {
  describe('#render', () => {
    it('should have main component', () => {
      const widgets = shallow(<CheckPayee />);
      expect(widgets.find('h4').length).toBe(1);
    });
    it('should have welcome text', () => {
      const widgets = shallow(<CheckPayee />);
      expect(widgets.find('h4').text()).toEqual('Add Payee');
    });
    it('should have input for checking', () => {
      const widgets = shallow(<CheckPayee />);
      expect(widgets.find('input').length).toBe(1);
    });
    it('should have input for button submit', () => {
      const widgets = shallow(<CheckPayee />);
      expect(widgets.find('button').length).toBe(1);
    });
  });
  describe('#inputChange', () => {
    it('should return 90 as true when input was 90', () => {
      const widgets = shallow(<CheckPayee />);
      const input = widgets.find('#input-payee');
      input.simulate('change', {
        target: {
          value: '90',
        },
      });
      expect(widgets.state('inputAddPayee')).toBe('90');
    });
    it('should return 50 as true when input was 50', () => {
      const widgets = shallow(<CheckPayee />);
      const input = widgets.find('#input-payee');
      input.simulate('change', {
        target: {
          value: '50',
        },
      });
      expect(widgets.state('inputAddPayee')).toBe('50');
    });
  });
});
