import { shallow, mount } from 'enzyme';
import React from 'react';
import store from 'simple-global-store';
import StepConfirm from '../../js/component/Send/StepConfirm';
import '../../setupTests';

describe('SendMoney', () => {
  beforeEach(()=> {
    store.update({
      isLoggedIn: true,
      userData: { userId : 1 },
    });
  })
  describe('render', () => {
    it('should have main welcoming indicate sendmoney page', () => {
      const widgets = shallow(<StepConfirm />);
      expect(widgets.find('#step-form-wrapper').length).toBe(1);
    });
    it('should have main indicate image was redered', () => {
      const widgets = shallow(<StepConfirm />);
      expect(widgets.find('#image-profile').length).toBe(1);
    });
    it('should have a buttons render', () => {
      const widgets = shallow(<StepConfirm />);
      expect(widgets.find('button').length).toBeGreaterThan(1);
    });
    it('should have input for password', () => {
      const widgets = shallow(<StepConfirm />);
      expect(widgets.find('#input-password').length).toBe(1);
    });
  });
  describe('#validation', () => {
    it('validation password input', () => {
      const widgets = mount(<StepConfirm />);
      const inputNumberTransfer = widgets.find('#input-password');
      inputNumberTransfer.simulate('change', { target: { value: 'passwordASA12312' } });
      expect(widgets.state('passWordInput')).toBe('passwordASA12312');
    });
    it('validation password input', () => {
      const widgets = mount(<StepConfirm />);
      const inputNumberTransfer = widgets.find('#input-password');
      inputNumberTransfer.simulate('change', { target: { value: '1234567SDFGHJZXCVBN' } });
      expect(widgets.state('passWordInput')).toBe('1234567SDFGHJZXCVBN');
    });
  });
});
