import { mount } from 'enzyme';
import React from 'react';
import PayeeRow from '../../js/component/Payee/PayeeRow';
import '../../setupTests';

describe('PayeeRow', () => {
  describe('#render', () => {
    it('should have tr tag', () => {
      const payeeItem = [
        {
          name: 'dewa',
          payee_tag: '@dew',
          email: 'dewa@gmail.com',
        },
      ];
      const widgets = mount(<PayeeRow payeeItem={payeeItem} />);
      expect(widgets.find('tr').length).toBe(1);
    });

    it('should have 3 td tag', () => {
      const payeeItem = [
        {
          name: 'dewa',
          payee_tag: '@dew',
          email: 'dewa@gmail.com',
        },
      ];
      const widgets = mount(<PayeeRow payeeItem={payeeItem} />);
      expect(widgets.find('td').length).toBe(3);
    });
  });

  describe('#showData', () => {
    it('should show the name payee', () => {
      const payeeItem = [
        {
          name: 'dewa',
          payee_tag: '@dew',
          email: 'dewa@gmail.com',
        },
      ];
      const widgets = mount(<PayeeRow payeeItem={payeeItem} />);
      expect(widgets.find('#payeeName0').contains('dewa')).toBe(true);
    });

    it('should show the payee tag', () => {
      const payeeItem = [
        {
          name: 'dewa',
          chip_tag: '@dew',
          email: 'dewa@gmail.com',
        },
      ];
      const widgets = mount(<PayeeRow payeeItem={payeeItem} />);
      expect(widgets.find('#payeeTag0').contains('@dew')).toBe(true);
    });

    it('should show the payee email', () => {
      const payeeItem = [
        {
          name: 'dewa',
          payee_tag: '@dew',
          email: 'dewa@gmail.com',
        },
      ];
      const widgets = mount(<PayeeRow payeeItem={payeeItem} />);
      expect(widgets.find('#payeeEmail0').contains('dewa@gmail.com')).toBe(true);
    });
  });
});
