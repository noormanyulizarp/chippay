import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import store from 'simple-global-store';
import Dashboard from '../js/component/Dashboard';
import '../setupTests';

describe('Dashboard', () => {
  let widgets;
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
    it('should have main component', () => {
      widgets = shallow(<Dashboard />);
      expect(widgets.find('h2').length).toBe(1);
    });

    it('should have welcome text', () => {
      widgets = shallow(<Dashboard />);
      expect(widgets.find('h2').text()).toEqual('Welcome');
    });

    it('should have WidgetCurrentBalance component', () => {
      widgets = shallow(<Dashboard />);
      expect(widgets.find('WidgetCurrentBalance').length).toBe(1);
    });

    it('should have WidgetCurrentBalance component', () => {
      widgets = shallow(<Dashboard />);
      expect(widgets.find('WidgetCurrentBalance').length).toBe(1);
    });
  });

  describe('#fetchData', () => {
    it('should fetch the data from the server', (done) => {
      widgets = mount(<Dashboard />);
      const transactionData = [
        {
          name: 'noorman',
          payee_tag: '@noorman',
          email: 'noormanyulizarp@gmail.com',
          id: 1,
          description: 'istri muda',
          date: '2018-04-01',
          amount: 10,
          wallet_beneficiary: 1,
          wallet_remitter: 1,
          user: { name: 'Dewa', email: 'dewa@mail.com' },
        },
      ];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: transactionData,
        }).then(() => {
          expect(widgets.state().transactions).toEqual(transactionData);
          done();
        });
      });

      it('should fetch the current balance  from the server', (done) => {
        const currentBalance = 1000;
        widgets = mount(<Dashboard />);
        moxios.wait(() => {
          const fetchBalanceRequest = moxios.requests.at(0);
          const fetchTransactionsRequest = moxios.requests.at(1);
          fetchBalanceRequest.respondWith({
            status: 200,
            response: { current_balance: currentBalance },
          }).then(() => fetchTransactionsRequest.respondWith({
            status: 200,
            response: [],
          })).then(() => {
            widgets.update();
            expect(widgets.find('WidgetCurrentBalance')).toContain(1000);
            done();
          });
        });
      });
    });
  });
});
