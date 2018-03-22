import { mount, shallow } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import store from 'simple-global-store';
import swal from 'sweetalert2';
import TopUpBalance from '../js/component/TopUp/TopUpBalance';
import '../setupTests';

describe('Top Up Balance', () => {
  describe('render', () => {
    it('should have header text', () => {
      const topUpPage = shallow(<TopUpBalance />);
      expect(topUpPage.find('h4').text()).toEqual('Top Up Balance');
    });
    it('should have an input topUpAmount', () => {
      const topUpPage = shallow(<TopUpBalance />);
      expect(topUpPage.find('#input-top-up-amount').length).toEqual(1);
    });
  });

  describe('onChange', () => {
    const topUpPage = mount(<TopUpBalance />);
    const button = topUpPage.find('#input-top-up-amount');
    button.simulate('change', {
      target: { value: 1000 },
    });
    expect(topUpPage.state('topUpAmount')).toEqual(1000);
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      moxios.install();
      store.update({
        isLoggedIn: true,
        userData: { walletTag : 'Randomtag' },
      });
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should render a swal with red alert when amount is wrong', () => {
      const topUpPage = mount(<TopUpBalance />);
      topUpPage.setState({
        topUpAmount: -1000,
      });
      const button = topUpPage.find('#transaction-form__save');
      button.simulate('click');
      topUpPage.update();
      expect(swal.isVisible()).toBe(true);
      expect(swal.getTitle().textContent).toBe('Oops...');
    });

    it('should render a success function when all request is valid', (done) => {
      const topUpPage = mount(<TopUpBalance />);
      topUpPage.setState({
        topUpAmount: 250000,
      });
      const button = topUpPage.find('#transaction-form__save');
      button.simulate('click');
      swal.clickConfirm();
      topUpPage.update();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: [1],
        }).then(() => {
          expect(swal.isVisible()).toBe(true);
          expect(topUpPage.state('isSuccess')).toBe(true);
          done();
        });
      });
    });

    it('should render the right alert when server is error', (done) => {
      const topUpPage = mount(<TopUpBalance />);
      topUpPage.setState({
        topUpAmount: 250000,
      });
      const button = topUpPage.find('#transaction-form__save');
      button.simulate('click');
      swal.clickConfirm();

      topUpPage.update();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 500,
        }).then(() => {
          expect(topUpPage.state('isSuccess')).toBe(false);
          done();
        });
      });
    });
  });
});
