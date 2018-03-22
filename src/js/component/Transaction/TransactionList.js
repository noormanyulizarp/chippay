import axios from 'axios';
import React, { Component } from 'react';
import store from 'simple-global-store';
import TransactionData from './TransactionItem';
import TransactionFilter from './TransactionFilter';
import serverUrl from '../../../ServerUrl';

export default class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionData: [
        {
          amount: 200,
          description: 'Payroll',
          date: '2018-02-21',
          user: { name: 'Rangga' },
        },
      ],
      filterQuery: {},
      sortAmountAscending: false,
    };

    this.filterTransaction = this.filterTransaction.bind(this);
    this.sortByAmount = this.sortByAmount.bind(this);
  }

  componentDidMount() {
    const { walletId } = store.data.userData;
    axios.get(`${serverUrl}/wallets/${walletId}/transactions`)
      .then((response) => {
        this.setState({
          transactionData: response.data,
        });
      });
  }

  filterTransaction(newFilterQuery) {
    this.setState({
      filterQuery: newFilterQuery,
    });
  }

  sortByAmount() {
    const reverse = this.state.sortAmountAscending;
    const transactionAmountSorted = this.state.transactionData.sort((champion, competitor) => {
      let isBigger = champion.amount - competitor.amount;

      if (reverse) {
        isBigger = -isBigger;
      }
      return isBigger;
    });

    this.setState({
      transaction: transactionAmountSorted,
      sortAmountAscending: !reverse,
    });
  }

  render() {
    return (
      <div>
        <h2>Transaction List</h2>
        <div className="line" />
        <TransactionFilter
          callWhenClicked={this.filterTransaction}
          sortAmount={this.sortByAmount}
        />
        <div className="row">
          <div className="col-md-12">
            <TransactionData
              transactionData={this.state.transactionData}
              filters={this.state.filterQuery}
            />
          </div>
        </div>
        <div className="line" />
      </div>
    );
  }
}
