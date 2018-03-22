import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import SendList from '../../js/component/Send/SendList';
import '../../setupTests';

describe('Sendlist', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  describe('render', () => {
    it('should have main component', () => {
      const widgets = shallow(<SendList sendContactData={[]}/>);
      expect(widgets.find('#send-lit-contact').length).toBe(1);
    });
  });

  describe('#sendContactData', () => {
    it('not found rendered data when send data contact was 0', () => {
      const widgets = shallow(<SendList sendContactData={[]}/>);
      expect(widgets.find('SendItem').length).toBe(0);
    });

    it('not found rendered data when send data contact was 0', () => {
      const dataToSend = [
        {
          name: 'noorman',
          chip_tag: 'noorman',
          email: 'noorman@gmail.com'
        }
      ];
      const widgets = shallow(<SendList sendContactData={dataToSend}/>);
      expect(widgets.find('SendItem').length).toBe(1);
    });

    it('not found rendered data when send data contact was 0', () => {
      const dataToSend = [
        {
          name: 'noorman',
          chip_tag: 'noorman',
          email: 'noorman@gmail.com'
        }
      ];
      const widgets = mount(<SendList sendContactData={dataToSend}/>);
      expect(widgets.find('SendItem').contains('noorman')).toBe(true);
    });
    it('it will rendered the second data', () => {
      const dataToSend = [
        {
          name: 'noorman',
          chip_tag: 'noorman',
          email: 'noorman@gmail.com'
        },
        {
          name: 'seconddata',
          chip_tag: 'seconddata',
          email: 'seconddata@gmail.com'
        }
      ];
      const widgets = mount(<SendList sendContactData={dataToSend}/>);
      expect(widgets.find('SendItem').contains('seconddata')).toBe(true);
    });
  });
});