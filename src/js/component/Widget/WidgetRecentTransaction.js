import axios from 'axios';
import React, { Component } from 'react';
import RecentTransactionData from './RecentTransactionData';
import serverUrl from '../../../ServerUrl';
import store from 'simple-global-store';

export default class WidgetRecentTransaction extends Component {
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
    };
  }

  componentDidMount() {
    const {userId} = store.data.userData;
    axios.get(`${serverUrl}/wallets/${userId}/transactions?recent=3`)
      .then((response) => {
        this.setState({
          transactionData: response.data,
        });
      });
  }

  render() {
    return (
        <div id="recent-wrapper" className="pad-left-right-conteent">
          <h4><span className="text-pad-left-right"> Latest Transaction </span></h4>
          <div className="row">
            <div className="col-md-12">
              <RecentTransactionData transactionData={this.state.transactionData} />
            </div>
          </div>
          <div className="line" />
        </div>
    );
  }
}
