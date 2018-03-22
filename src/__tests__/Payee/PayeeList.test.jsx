import { shallow } from 'enzyme';
import React from 'react';
import PayeeList from '../../js/component/Payee/PayeeList';
import '../../setupTests';

describe('PayeeList', () => {
  describe('#render', () => {
    it('should render thead', () => {
      const dataToRender = [
        {
          name: 'noorman',
          payee_tag: '@noorman',
          email: 'noormanyulizarp@gmail.com',
        },
      ];
      const widgets = shallow(<PayeeList sendDataPayees={dataToRender} />);
      expect(widgets.find('thead').length).toBe(1);
    });
    it('should render tbody', () => {
      const dataToRender = [
        {
          name: 'noorman',
          payee_tag: '@noorman',
          email: 'noormanyulizarp@gmail.com',
        },
      ];
      const widgets = shallow(<PayeeList sendDataPayees={dataToRender} />);
      expect(widgets.find('tbody').length).toBe(1);
    });
  });
  describe('#render-data', () => {
    it('should have table only one with tow td', () => {
      const dataToRender = [
        {
          name: 'noorman',
          payee_tag: '@noorman',
          email: 'noormanyulizarp@gmail.com',
        },
        {
          name: 'dewa',
          payee_tag: '@dew',
          email: 'dewa@gmail.com',
        },
      ];
      const widgets = shallow(<PayeeList sendDataPayees={dataToRender} />);
      expect(widgets.find('table').length).toBe(1);
    });
  });
});
