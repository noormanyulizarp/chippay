import { shallow } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import store from 'simple-global-store';
import TransactionFilter from '../../js/component/Transaction/TransactionFilter';
import TransactionList from '../../js/component/Transaction/TransactionList';
import '../../setupTests';

describe('Transaction List', () => {
  beforeEach(() => {
    moxios.install();
    store.update({
      isLoggedIn: true,
      userData: { walletId: 1 },
    })
  });

  afterEach(() => {
    moxios.uninstall();
  });
  describe('#render', () => {
    it('should have main component', () => {
      const widgets = shallow(<TransactionList />);
      expect(widgets.find('h2').length).toBe(1);
    });

    it('should have welcome text', () => {
      const widgets = shallow(<TransactionList />);
      expect(widgets.find('h2').text()).toEqual('Transaction List');
    });

    it('should render the transaction data component', () => {
      const wrapper = shallow(<TransactionList />);
      const transactionDataComponent = wrapper.find('TransactionData').length;
      expect(transactionDataComponent).toEqual(1);
    });
  });

  describe('#setState', () => {
    it('should set the state of the transaction list with the amount 200', () => {
      const wrapper = shallow(<TransactionList />);
      const data = [
        {
          amount: 200,
          description: 'Payroll',
          date: '2018-02-02',
          user: { name: 'Rona' },
        }];
      wrapper.setState({
        transactionData: data,
      });
      expect(wrapper.state().transactionData).toEqual(data);
    });

    it('should set the state of the transaction list with the amount 300', () => {
      const wrapper = shallow(<TransactionList />);
      const data = [
        {
          amount: 300,
          description: 'Payroll',
          date: '2018-02-02',
          user: { name: 'Rona' },
        }];
      wrapper.setState({
        transactionData: data,
      });
      expect(wrapper.state().transactionData).toEqual(data);
    });
  });

  describe('`#fetchData', () => {
    it('should fetch the data from the server', (done) => {
      const wrapper = shallow(<TransactionList />);
      const transactionData = [
        {
          amount: 200,
          description: 'payroll',
          date: '2018-02-02',
          user: { name: 'Rona' },
        }];

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

  describe('sortByAmount', () => {
    it('should sort by amount ascendingly when clicked once', (done) => {
      const transaction = {
        date: '12/28/2015',
        description: 'Treats myself 20 birthday cakes',
        amount: 400000,
        user: { name: 'Rona' },
      };
      const anotherTransaction = {
        date: '12/28/2019',
        description: 'Treats Freys some Wine',
        amount: 30000,
        user: { name: 'Rangga' },
      };
      const transactionWrapper = shallow(<TransactionList />);
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: [transaction, anotherTransaction],
        }).then(() => {
          const sortButtonByAmount = transactionWrapper.find(TransactionFilter).dive().find(
            '#js-form-sort__amount',
          );
          sortButtonByAmount.simulate('click');
          const expectedTransactionState = [
            {
              date: '12/28/2019',
              description: 'Treats Freys some Wine',
              amount: 30000,
              user: { name: 'Rangga' },
            },
            {
              date: '12/28/2015',
              description: 'Treats myself 20 birthday cakes',
              amount: 400000,
              user: { name: 'Rona' },
            },
          ];
          expect(transactionWrapper.state('transactionData')).toEqual(expectedTransactionState);
          done();
        });
      });
    });
  });
});
