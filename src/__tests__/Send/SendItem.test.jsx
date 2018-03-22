import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import SendItem from '../../js/component/Send/SendItem';
import '../../setupTests';

describe('Sendlist', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('render', () => {
    it('render send item', () => {
      it('should have main welcoming indicate sendmoney page', () => {
        const widgets = shallow(<SendItem />);
        expect(widgets.find('#c').length).toBe(1);
      });
    });
    it('render send item', () => {
      it('should have main welcoming indicate sendmoney page', () => {
        const widgets = shallow(<SendItem />);
        expect(widgets.find('#c').length).toBe(1);
      });
    });
  });
});