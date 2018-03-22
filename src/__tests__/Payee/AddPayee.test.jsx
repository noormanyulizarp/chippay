import { shallow } from 'enzyme';
import React from 'react';
import AddPayee from '../../js/component/Payee/AddPayee';
import '../../setupTests';

describe('AddPayee', () => {
  describe('#render', () => {
    it('should have main component', () => {
      const widgets = shallow(<AddPayee />);
      expect(widgets.find('div').length).toBe(2);
    });

    it('should have main component', () => {
      const widgets = shallow(<AddPayee />);
      expect(widgets.find('img').length).toBe(1);
    });

    it('should have welcome button', () => {
      const widgets = shallow(<AddPayee />);
      expect(widgets.find('button').length).toBe(1);
    });
  });
});
