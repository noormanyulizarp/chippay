import { shallow } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import store from 'simple-global-store';
import AddPayee from '../../js/component/Payee/AddPayee';
import CheckPayee from '../../js/component/Payee/CheckPayee';
import Payee from '../../js/component/Payee/Payee';
import PayeeList from '../../js/component/Payee/PayeeList';
import '../../setupTests';

describe('Payee', () => {
  let wrapper = null;

  beforeEach(() => {
    moxios.install();
    store.update({
      isLoggedIn: true,
      userData: { userId : 1, walletTag: 'randomTag' },
    });
    wrapper = shallow(<Payee />);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('render', () => {
    it('should render proper component', () => {
      expect(wrapper.find('h2').text()).toEqual(' Payee ');
      expect(wrapper.find(CheckPayee).length).toBe(1);
      expect(wrapper.find(PayeeList).length).toBe(1);
    });

    it('should render element payee not found when state.isTargetPayeeNotFound = true', () => {
      wrapper.setState({ isTargetPayeeNotFound: true });
      expect(wrapper.find('#payee-not-found').length).toBe(1);
    });

    it('should not render element payee not found when state.isTargetPayeeNotFound = false', () => {
      wrapper.setState({ isTargetPayeeNotFound: false });
      expect(wrapper.find('#payee-not-found').length).toBe(0);
    });

    it('render AddPayee component when target payee loaded and found', () => {
      wrapper.setState({
        isTargetPayeeLoaded: true,
        isTargetPayeeNotFound: false,
      });
      expect(wrapper.find(AddPayee).length).toBe(1);
    });

    it('not render AddPayee component when target payee loaded and payee not found', () => {
      wrapper.setState({
        isTargetPayeeLoaded: true,
        isTargetPayeeNotFound: true,
      });
      expect(wrapper.find(AddPayee).length).toBe(0);
    });

    it('should render PayeeList component with correct props', () => {
      const payeesData = [
        {
          name: 'noorman',
          payee_tag: '@noorman',
          email: 'noormanyulizarp@gmail.com',
        }];
      wrapper.setState({
        payeesData,
      });
      const payeeList = wrapper.find(PayeeList);
      expect(payeeList.props().sendDataPayees).toEqual(expect.arrayContaining(payeesData));
    });
  });

  describe('#fetchData', () => {
    it('should fetch the data from the server', (done) => {
      const payeesData = [
        {
          name: 'noorman',
          payee_tag: '@noorman',
          email: 'noormanyulizarp@gmail.com',
        },
      ];
      const mockResponsePayload = { data: payeesData };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockResponsePayload,
        }).then(() => {
          expect(wrapper.state().payeesData).toEqual(payeesData);
          done();
        });
      });
    });

    it('request check', (done) => {
      const payeesData = [
        {
          name: 'noorman',
          email: 'noormanyulizarp@gmail.com',
        },
      ];
      wrapper.instance().checkExistChipTag('noormanChipTag');
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { data: payeesData },
        }).then(() => {
          expect(wrapper.state().insertedChipTag).toEqual('noormanChipTag');
          done();
        });
      });
    });
  });
});
