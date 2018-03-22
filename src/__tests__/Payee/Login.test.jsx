import { shallow } from 'enzyme';
import React from 'react';
import Login from '../../js/component/Login';
import '../../setupTests';

describe('login', () => {
  describe('render', () => {
    it('render form login', () => {
      const wrapper = shallow(<Login />);
      const loginWrapper = wrapper.find('input');
      expect(loginWrapper.length).toBe(2);
    });
    it('render form login', () => {
      const wrapper = shallow(<Login />);
      const loginWrapper = wrapper.find('h2');
      expect(loginWrapper.text()).toBe('CHIP Pay');
    });
  });

  describe('stateChange', () => {
    it('should detect the change in email input', () => {
      const wrapper = shallow(<Login />);
      const emailInput = wrapper.find('input').first();

      emailInput.simulate('change', {
        target: { value: 'rona@rona.com' },
      });
      expect(wrapper.state('email')).toEqual('rona@rona.com');
    });
    it('should detect the change in email input', () => {
      const wrapper = shallow(<Login />);
      const emailInput = wrapper.find('input').first();

      emailInput.simulate('change', {
        target: { value: 'budi@budi.com' },
      });
      expect(wrapper.state('email')).toEqual('budi@budi.com');
    });
    it('should detect the change in password input', () => {
      const wrapper = shallow(<Login />);
      const passwordInput = wrapper.find('input').at(1);

      passwordInput.simulate('change', {
        target: { value: 'tampan' },
      });
      expect(wrapper.state('password')).toEqual('tampan');
    });
    it('should detect the change in password input', () => {
      const wrapper = shallow(<Login />);
      const passwordInput = wrapper.find('input').at(1);
      passwordInput.simulate('change', {
        target: { value: 'anotherTampan' },
      });
      expect(wrapper.state('password')).toEqual('anotherTampan');
    });
  });
});