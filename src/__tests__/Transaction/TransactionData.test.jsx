import { mount, shallow } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import TransactionData from '../../js/component/Transaction/TransactionItem';
import '../../setupTests';

const emptyFilter = {
  description: '',
  amountLowerThan: '',
  amountGreaterThan: '',
};

describe('Transaction Data', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  describe('#render', () => {
    it('should render the amount component', () => {
      const data = [
        {
          amount: 200,
          description: 'Payroll',
          date: '2018-02-02',
          user: { name: 'Rangga' },
        },
      ];
      const wrapper = mount(<TransactionData transactionData={data} filters={emptyFilter} />);
      const findAmountElement = wrapper.find('#transactionAmount0').length;
      expect(findAmountElement).toEqual(1);
    });

    it('should render the description component', () => {
      const data = [
        {
          amount: 200,
          description: 'Payroll',
          date: '2018-02-02',
          user: { name: 'Rangga' },
        },
      ];
      const wrapper = mount(<TransactionData transactionData={data} filters={emptyFilter} />);
      const findAmountElement = wrapper.find('#transactionDescription0').length;
      expect(findAmountElement).toEqual(1);
    });

    it('should render the date component', () => {
      const data = [
        {
          amount: 200,
          description: 'Payroll',
          date: '2018-02-02',
          user: { name: 'Rangga' },
        }];
      const wrapper = mount(<TransactionData transactionData={data} filters={emptyFilter} />);
      const findAmountElement = wrapper.find('#transactionDate0').length;
      expect(findAmountElement).toEqual(1);
    });
  });

  describe('#showData', () => {
    it('should show the amount data', () => {
      const data = [
        {
          amount: 200,
          description: 'Payroll',
          date: '2018-02-02',
          user: { name: 'Rangga' },
        },
      ];
      const wrapper = mount(<TransactionData transactionData={data} filters={emptyFilter} />);
      const findAmountElement = wrapper.find('#transactionAmount0');
      expect(findAmountElement.contains('IDR 200')).toBe(true);
    });

    it('should show the amount data in second index', () => {
      const data = [
        {
          amount: 200,
          description: 'Payroll',
          date: '2018-02-02',
          user: { name: 'Rangga' },
        },
        {
          amount: 300,
          description: 'Payroll',
          date: '2018-02-02',
          user: { name: 'Rangga' },
        },
      ];
      const wrapper = mount(<TransactionData transactionData={data} filters={emptyFilter} />);
      const findAmountElement = wrapper.find('#transactionAmount1');
      expect(findAmountElement.contains('IDR 300')).toBe(true);
    });

    it('should show the description data', () => {
      const data = [
        {
          amount: 200,
          description: 'Payroll',
          date: '2018-02-02',
          user: { name: 'Rangga' },
        },
      ];
      const wrapper = mount(<TransactionData transactionData={data} filters={emptyFilter} />);
      const findDescriptionElement = wrapper.find('#transactionDescription0');
      expect(findDescriptionElement.contains('Payroll')).toBe(true);
    });

    it('should show the description data in second index', () => {
      const data = [
        {
          amount: 200,
          description: 'Payroll',
          date: '2018-02-02',
          user: { name: 'Rangga' },
        },
        {
          amount: 200,
          description: 'Debt',
          date: '2018-02-02',
          user: { name: 'Rangga' },
        },
      ];
      const wrapper = mount(<TransactionData transactionData={data} filters={emptyFilter} />);
      const findDescriptionElement = wrapper.find('#transactionDescription1');
      expect(findDescriptionElement.contains('Debt')).toBe(true);
    });

    it('should show the date data', () => {
      const data = [
        {
          amount: 200,
          description: 'Payroll',
          date: '2018-02-02',
          user: { name: 'Rangga' },
        },
      ];
      const wrapper = mount(<TransactionData transactionData={data} filters={emptyFilter} />);
      const findDescriptionElement = wrapper.find('#transactionDate0');
      expect(findDescriptionElement.contains('Feb 2, 2018')).toBe(true);
    });

    it('should show the date data in second index', () => {
      const data = [
        {
          amount: 200,
          description: 'Payroll',
          date: '2018-02-02',
          user: { name: 'Rangga' },
        },
        {
          amount: 200,
          description: 'Payroll',
          date: '2018-03-02',
          user: { name: 'Rangga' },
        },
      ];
      const wrapper = mount(<TransactionData transactionData={data} filters={emptyFilter} />);
      const findDescriptionElement = wrapper.find('#transactionDate1');
      expect(findDescriptionElement.contains('Mar 2, 2018')).toBe(true);
    });
  });

  describe('getFilteredArray', () => {
    it('should render all transaction datas when no filter applied', () => {
      const transaction = {
        date: '28/12/2015',
        description: 'Treats myself 20 birthday cakes',
        amount: 2000000,
        user: { name: 'Rona' },
      };
      const anotherTransaction = {
        date: '28/12/2019',
        description: 'Treat Freys some wine',
        amount: 2000000,
        user: { name: 'Christo' },
      };
      const anyTransaction = {
        date: '28/12/2019',
        description: 'Pay Cersei some wine',
        amount: 2000000,
        user: { name: 'Cersei' },
      };

      const dataToInject = [transaction, anotherTransaction, anyTransaction];
      const table = shallow(<TransactionData
        transactionData={dataToInject}
        filters={emptyFilter}
      />);
      expect(table.instance().getFilteredArray()).toEqual(dataToInject);
    });

    it('should return 2 row when filter applied', () => {
      const transaction = {
        date: '28/12/2015',
        description: 'Treats myself 20 birthday cakes',
        amount: 2000000,
        user: { name: 'Rona' },
      };
      const anotherTransaction = {
        date: '28/12/2019',
        description: 'Treat Freys some wine',
        amount: 2000000,
        user: { name: 'Christo' },
      };
      const anyTransaction = {
        date: '28/12/2019',
        description: 'Pay Cersei some wine',
        amount: 2000000,
        user: { name: 'Cersei' },
      };

      const dataToInject = [transaction, anotherTransaction, anyTransaction];
      const filterQuery = {
        description: 'wine',
        amountLowerThan: '',
        amountGreaterThan: '',
      };
      const expectedRenderedTrx = [anotherTransaction, anyTransaction];
      const table = shallow(<TransactionData
        transactionData={dataToInject}
        filters={filterQuery}
      />);
      expect(table.instance().getFilteredArray()).toEqual(expectedRenderedTrx);
    });
  });
});
