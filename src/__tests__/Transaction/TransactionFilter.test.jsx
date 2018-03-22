import { shallow } from 'enzyme';
import React from 'react';
import TransactionFilter from '../../js/component/Transaction/TransactionFilter';
import '../../setupTests';

const blankFunction = () => {};

describe('Filter Transaction Form', () => {
  describe('Description input change', () => {
    it('should detect description change to 1000 in the state ', () => {
      const filterForm = shallow(<TransactionFilter callWhenClicked={blankFunction} />);
      const inputDescription = filterForm.find('#js-form-filter__description');
      inputDescription.simulate('change',
        { target: { value: '' } });

      expect(filterForm.state('description')).toBe('');
    });

    it('should detect description change to 20000 in the state ', () => {
      const filterForm = shallow(<TransactionFilter callWhenClicked={blankFunction} />);
      const inputDescription = filterForm.find('#js-form-filter__description');
      inputDescription.simulate('change',
        { target: { value: 'Lannister Send Their Regards!' } });

      expect(filterForm.state('description')).toBe('Lannister Send Their Regards!');
    });
  });

  describe('Amount Lower Than', () => {
    it('should detect amount filter lower than "" ', () => {
      const filterForm = shallow(<TransactionFilter callWhenClicked={blankFunction} />);
      const inputAmountLowerThan = filterForm.find('#js-form-filter__lower-than');
      inputAmountLowerThan.simulate('change',
        { target: { value: '' } });

      expect(filterForm.state('amountLowerThan')).toBe('');
    });
    it('should detect amount filter lower than 10000', () => {
      const filterForm = shallow(<TransactionFilter callWhenClicked={blankFunction} />);
      const inputAmountLowerThan = filterForm.find('#js-form-filter__lower-than');
      inputAmountLowerThan.simulate('change',
        { target: { value: 10000 } });
      expect(filterForm.state('amountLowerThan')).toBe(10000);
    });
  });

  describe('Amount Greater Than', () => {
    it('should detect amount filter greater than "" ', () => {
      const filterForm = shallow(<TransactionFilter callWhenClicked={blankFunction} />);
      const inputGreaterThan = filterForm.find('#js-form-filter__greater-than');
      inputGreaterThan.simulate('change',
        { target: { value: '' } });

      expect(filterForm.state('amountGreaterThan')).toBe('');
    });
    it('should detect amount filter greater than 10000', () => {
      const filterForm = shallow(<TransactionFilter callWhenClicked={blankFunction} />);
      const inputGreaterThan = filterForm.find('#js-form-filter__greater-than');
      inputGreaterThan.simulate('change',
        { target: { value: 10000 } });
      expect(filterForm.state('amountGreaterThan')).toBe(10000);
    });
  });

  describe('Submitting Filter Form', () => {
    it('should call the given callback once when the button is fired', () => {
      const spy = jest.fn();
      const filterForm = shallow(<TransactionFilter callWhenClicked={spy} />);
      const button = filterForm.find('#js-form-filter__submit');
      button.simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call the given callback once when the button is fired', () => {
      const spy = jest.fn();
      shallow(<TransactionFilter callWhenClicked={spy} />);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Parameters that sent to the given callback', () => {
    it('should send its state to parent when submitted (direct change state)', () => {
      const spy = jest.fn();
      const filterForm = shallow(<TransactionFilter callWhenClicked={spy} />);
      const expectedSentState =
          {
            description: 'Treats myself a birthday cake',
            amountLowerThan: 1000,
            amountGreaterThan: 1000000,
          };
      filterForm.setState(expectedSentState);
      const button = filterForm.find('#js-form-filter__submit');
      button.simulate('click');

      expect(spy).toBeCalledWith(expectedSentState);
    });

    it('should send its state to parent when submitted, by changing inputs', () => {
      const spy = jest.fn();
      const filterForm = shallow(<TransactionFilter callWhenClicked={spy} />);

      const inputDescription = filterForm.find('#js-form-filter__description');
      inputDescription.simulate('change',
        { target: { value: 'birthday' } });

      const inputLowerThan = filterForm.find('#js-form-filter__lower-than');
      inputLowerThan.simulate('change',
        { target: { value: 2000000 } });

      const inputGreaterThan = filterForm.find('#js-form-filter__greater-than');
      inputGreaterThan.simulate('change',
        { target: { value: 10000 } });

      const button = filterForm.find('#js-form-filter__submit');
      button.simulate('click');

      const expectedParams = {
        description: 'birthday',
        amountLowerThan: 2000000,
        amountGreaterThan: 10000,
      };

      expect(spy).toBeCalledWith(expectedParams);
    });
  });

  describe('reset inputs', () => {
    it('should state when submit is clicked', () => {
      const filterForm = shallow(<TransactionFilter callWhenClicked={blankFunction} />);
      const descriptionInput = filterForm.find('#js-form-filter__description');
      descriptionInput.simulate('change',
        { target: { value: 'Lannister send their regards!' } });
      filterForm.find('#js-form-filter__submit').simulate('click');
      const expectedState = {
        description: '',
        amountGreaterThan: '',
        amountLowerThan: '',
      };
      expect(filterForm.state()).toEqual(expectedState);
    });
  });
});
