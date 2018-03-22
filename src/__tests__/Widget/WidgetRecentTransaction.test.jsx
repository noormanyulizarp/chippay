import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import '../../setupTests';
import store from 'simple-global-store';
import Widget from '../../js/component/Widget/WidgetRecentTransaction';

describe('WidgetRecentTransaction', () => {
  beforeEach(() => {
    moxios.install();
    store.update({
      isLoggedIn: true,
      userData : { userId : 10},
    })
  });

  afterEach(() => {
    moxios.uninstall();
  });
  describe('#render', () => {
    it('should have rendered current balance', () => {
      const widgets = shallow(<Widget/>);
      expect(widgets.find('#recent-wrapper').length).toBe(1);
    });
    it('should have rendered RecentTransactionData', () => {
      const widgets = shallow(<Widget/>);
      expect(widgets.find('RecentTransactionData').length).toBe(1);
    });
  });
  describe('fetchData', () => {
    it('should fetch the data from the server', (done) => {
      const wrapper = mount(<Widget/>);
      const transactionData = [
        {
          'id': 6,
          'description': 'setor duit',
          'date': '2018-03-11T09:06:23.615Z',
          'amount': 100,
          'wallet_beneficiary': 4,
          'wallet_remitter': 1,
          'user': {
            'id': 6,
            'name': 'Noorman',
            'email': 'noorman@mail.com',
          },
        },
        {
          'id': 7,
          'description': 'makan bang',
          'date': '2018-03-11T09:06:23.615Z',
          'amount': 200,
          'wallet_beneficiary': 4,
          'wallet_remitter': 1,
          'user': {
            'id': 6,
            'name': 'Noorman',
            'email': 'noorman@mail.com',
          },
        },
      ];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: transactionData,
        }).then(() => {
          expect(wrapper.state().transactionData).toEqual(transactionData);
          done();
        });
      });
    });

  });
});
