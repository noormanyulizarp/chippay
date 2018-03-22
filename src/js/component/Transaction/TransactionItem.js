import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class TransactionData extends Component {

  constructor(props) {
    super(props);
    this.getFilteredArray = this.getFilteredArray.bind(this);
  }

  static _displayAmount(amount) {
    let accountBalance = amount || 0;
    const isNegative = accountBalance < 0;
    accountBalance = Math.abs(accountBalance);
    const accountBalanceString = accountBalance.toString();
    const modulus = accountBalanceString.length % 3;
    let rupiah = accountBalanceString.substr(0, modulus);
    const thousand = accountBalanceString.substr(modulus).match(/\d{3}/g);

    if (thousand) {
      const separator = modulus ? '.' : '';
      rupiah += separator + thousand.join('.');
    }

    return `IDR ${isNegative ? '-' : ''}${rupiah}`;
  }

  getFilteredArray() {
    const { transactionData, filters } = this.props;
    return transactionData.filter((data) => {
      if (!data.description) {
        return !!filters.description;
      }
      let containsDescription = true;
      let isGreaterAmount = true;
      let isLowerAmount = true;
      if (!filters.description === false) {
        const loweredDescription = data.description.toLowerCase();
        const loweredFilter = filters.description.toLowerCase();
        containsDescription = loweredDescription.includes(loweredFilter);
      }
      if (!filters.amountLowerThan === false) {
        isGreaterAmount = data.amount <= filters.amountLowerThan;
      }
      if (!filters.amountGreaterThan === false) {
        isLowerAmount = data.amount >= filters.amountGreaterThan;
      }

      return (containsDescription && isGreaterAmount && isLowerAmount);
    });
  }

  render() {
    const renderedData = this.getFilteredArray();
    return renderedData.map((transaction, index) => (
      <section key={index.toString()} className="table-shadow">
        <div className="gaadiex-list">
          <div className="gaadiex-list-item border-b-1">
            <i className={`fa ${transaction.isRemitter
              ? 'fa-arrow-left red-icon'
              : 'fa-arrow-right green-icon'}`} />
            <p className="pull-right transaction-text desci"
               id={`transactionDate${index}`}>{moment(
              Date.parse(transaction.date)
            ).format('ll')}
            </p>
            <div className="gaadiex-list-item-text margin-top-2px">
              <p
                className={`${transaction.isRemitter ? 'red-icon' : 'green-icon'}`}
                id={`transactionAmount${index}`}
              >
                <strong>{TransactionData._displayAmount(transaction.amount)}</strong>
              </p>
              <strong>{`${transaction.isRemitter
                ? 'To:'
                : 'From:'}`} {transaction.user.name}
              </strong>
              <p className="transaction-text" id={`transactionDescription${index}`}>
                {transaction.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    ));
  }
}

const transactionData = PropTypes.shape({
  amount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
});

const filterShape = PropTypes.shape({
  description: PropTypes.string,
  amountGreaterThan: PropTypes.number,
  amountLowerThan: PropTypes.number
});
TransactionData.propTypes = {
  filters: filterShape.isRequired,
  transactionData: PropTypes.arrayOf(transactionData).isRequired
};

