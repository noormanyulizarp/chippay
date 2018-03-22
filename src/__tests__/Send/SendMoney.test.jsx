import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import store from 'simple-global-store';
import SendMoney from '../../js/component/Send/SendMoney';
import '../../setupTests';

describe('SendMoney', () => {
  beforeEach(() => {
    store.update({
      isLoggedIn: true,
      userData: { userId : 1 },
    });
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('render', () => {
    it('should have main welcoming indicate sendmoney page', () => {
      const widgets = shallow(<SendMoney />);
      expect(widgets.find('h2').length).toBe(1);
    });
    it('should have main component SendStep', () => {
      const widgets = shallow(<SendMoney />);
      widgets.setState({
        showSendStep: true,
      });
      expect(widgets.find('SendStep').length).toBe(1);
    });
    it('should have main component SendList', () => {
      const widgets = shallow(<SendMoney />);
      widgets.setState({
        showSendStep: true,
      });
      expect(widgets.find('SendList').length).toBe(1);
    });
  });
  describe('#fetchData', () => {
    it('should fetch the data from the server', (done) => {
      const wrapper = mount(<SendMoney />);
      const sendContactData = [
        {
          'id': 4,
          'name': 'Noorman',
          'email': 'noorman@mail.com',
          'chip_tag': 'noorman'
        },
      ];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: sendContactData,
        }).then(() => {
          expect(wrapper.find('tbody').length).toBe(1);
          done();
        });
      });
    });

    it('should fetch the data from the server', (done) => {
      const wrapper = mount(<SendMoney />);
      const dataToRender = [
        {
          'id': 4,
          'name': 'Noorman',
          'email': 'noorman@mail.com',
          'chip_tag': 'noorman',
        },
      ];

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            data: dataToRender,
          },
        }).then(() => {
          console.log(wrapper);
          expect(wrapper.state().sendContactData).toEqual(dataToRender);
          done();
        });
      });
    });

  });
});
