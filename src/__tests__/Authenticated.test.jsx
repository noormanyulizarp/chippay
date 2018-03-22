import { mount, shallow } from 'enzyme/build/index';
import moxios from 'moxios';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import store from 'simple-global-store';
import Authenticated from '../js/component/Authenticated';
import Dashboard from '../js/component/Dashboard';
import Payee from '../js/component/Payee/Payee';
import SendMoney from '../js/component/Send/SendMoney';
import TransactionList from '../js/component/Transaction/TransactionList';

describe('Authenticated', () => {
  beforeEach(() => {
    moxios.install();
    store.update({
      isLoggedIn: true,
      userData: { userId: 1, token : 'AnotherRandomToken' },
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });
  describe('render', () => {
    it('should have main component SideNavigation', () => {
      const widgets = shallow(<Authenticated />);
      expect(widgets.find('SideNavigation').length).toBe(1);
    });
    it('should have main component TopNavigation', () => {
      const widgets = shallow(<Authenticated />);
      expect(widgets.find('TopNavigation').length).toBe(1);
    });
  });
  describe('Routing', () => {
    it('routing on default should render dashboard', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <Authenticated />
        </MemoryRouter>,
      );
      expect(wrapper.find(Dashboard)).toHaveLength(1);
    });
    it('routing on /transaction should render transaction component', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/transaction']}>
          <Authenticated />
        </MemoryRouter>,
      );
      expect(wrapper.find(TransactionList)).toHaveLength(1);
    });
    it('routing on /Payeelist should render Payeelist component', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/Payee']}>
          <Authenticated />
        </MemoryRouter>,
      );
      expect(wrapper.find(Payee).length).toEqual(1);
    });
    it('routing on /Send should render send component', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/Send']}>
          <Authenticated />
        </MemoryRouter>,
      );
      expect(wrapper.find(SendMoney)).toHaveLength(1);
    });
  });
});

