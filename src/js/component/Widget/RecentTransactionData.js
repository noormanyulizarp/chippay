import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class RecentTransactionData extends Component {
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

  render() {
    return this.props.transactionData.map((transaction, index) => (
        <section key={index.toString()} className="table-shadow">
          <div className="gaadiex-list">
            <div className="gaadiex-list-item border-b-1">
              <i
                  className={
                    `fa ${
                        transaction.isRemitter
                            ? 'fa-arrow-left red-icon' : 'fa-arrow-right green-icon'
                        }`
                  }
              />
              <p className="pull-right transaction-text desci"
                 id={`transactionDate${index}`}>{moment(
                  Date.parse(transaction.date),
              ).format('ll')}
              </p>
              <div className="gaadiex-list-item-text margin-top-2px">
                <p
                    className={
                      `${transaction.isRemitter ? 'red-icon' : 'green-icon' } `
                    }
                    id={`transactionAmount${index}`}
                >
                  <strong>{RecentTransactionData._displayAmount(transaction.amount)}</strong>
                </p>
                <strong>{
                  `${transaction.isRemitter ? 'To:' : 'From:'}`
                } {
                  transaction.user.name
                }
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
  date: PropTypes.string.isRequired,
});

RecentTransactionData.propTypes = {
  transactionData: PropTypes.arrayOf(transactionData).isRequired,
};

