import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import StepForm from '../../js/component/Send/StepForm';
import '../../setupTests';

describe('SendMoney', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  describe('render', () => {
    it('should have main welcoming indicate sendmoney page', () => {
      const widgets = shallow(<StepForm />);
      expect(widgets.find('#step-form-wrapper').length).toBe(1);
    });
    it('should have main indicate image was redered', () => {
      const widgets = shallow(<StepForm />);
      expect(widgets.find('#image-profile').length).toBe(1);
    });
    it('should have a buttons render', () => {
      const widgets = shallow(<StepForm />);
      expect(widgets.find('button').length).toBeGreaterThan(1);
    });
    it('should have input for input ammount', () => {
      const widgets = shallow(<StepForm />);
      expect(widgets.find('#input-number-transfer').length).toBe(1);
    });
  });
  describe('#validation', () => {
    it('validation amount input', () => {
      const widgets = mount(<StepForm />);
      const inputNumberTransfer = widgets.find('#input-number-transfer');
      inputNumberTransfer.simulate('change', { target: { value: 10 } });
      expect(widgets.state('inputAmount')).toBe(10);
    });
    it('validation description', () => {
      const widgets = mount(<StepForm />);
      const inputDescription = widgets.find('#input-description');
      inputDescription.simulate('change', { target: { value: 'visa' } });
      expect(widgets.state('inputDescription')).toBe('visa');
    });
  });
});
