import { shallow, mount } from 'enzyme';
import React from 'react';
import SendStep from '../../js/component/Send/SendStep';
import '../../setupTests';

describe('SendMoney', () => {
  describe('render', () => {
    it('should have main welcoming indicate sendmoney page', () => {
      const widgets = shallow(<SendStep />);
      widgets.setState({
        step: 1,
      });
      expect(widgets.find('StepForm').length).toBe(1);
    });
    it('should have main welcoming indicate sendmoney page', () => {
      const widgets = shallow(<SendStep />);
      widgets.setState({
        step: 2,
      });
      expect(widgets.find('StepConfirm').length).toBe(1);
    });
    it('should have main welcoming indicate sendmoney page', () => {
      const widgets = shallow(<SendStep />);
      widgets.setState({
        step: 3,
      });
      expect(widgets.find('#transaction-succes').length).toBe(1);
    });
  });
});
