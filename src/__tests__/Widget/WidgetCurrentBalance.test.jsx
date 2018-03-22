import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import WidgetCurrentBalance from '../../js/component/Widget/WidgetCurrentBalance';
import '../../setupTests';

describe('Dashboard', () => {
  describe('#render', () => {
    it('should have main component', () => {
      const widgets = shallow(<WidgetCurrentBalance/>);
      expect(widgets.find('#current-balance-section').length).toBe(1);
    });
    it('should have rendered current balance', () => {
      const widgets = shallow(<WidgetCurrentBalance/>);
      expect(widgets.find('#value-current-balance').length).toBe(1);
    });
  });
  describe('#sendCurrentBalance', () => {
    it('should have main component', () => {
      const currentBalance = 1000;
      const widgets = mount(<WidgetCurrentBalance sendCurrentBalance={currentBalance}/>);
      expect(widgets.find('#value-current-balance').length).toBe(1);
      expect(widgets.find('#money-value').contains(1000)).toBe(true);
    });
  });
});
