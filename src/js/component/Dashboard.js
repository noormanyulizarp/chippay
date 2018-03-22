import axios from 'axios';
import React, { Component } from 'react';
import '../../styles/Navigation.css';
import WidgetCurrentBalance from './Widget/WidgetCurrentBalance';
import WidgetRecentTransaction from './Widget/WidgetRecentTransaction';
import serverUrl from '../../ServerUrl';
import store from 'simple-global-store';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentBalance: 0,
      ApiLoadFail: '',
      transactions: [],
    };
    this.fetchCurrentBalance = this.fetchCurrentBalance.bind(this);
    this.fetchRecentTransaction = this.fetchRecentTransaction.bind(this);
  }

  componentDidMount() {
    this.fetchCurrentBalance();
    this.fetchRecentTransaction();
  }

  fetchCurrentBalance() {
    const {userId} = store.data.userData;
    axios.get(`${serverUrl}/wallets/${userId}`)
      .then((response) => {
        const { current_balance } = response.data;
        this.setState({
          CurrentBalance: current_balance.toLocaleString(),
        });
      }).catch((error) => {
        this.setState({
          ApiLoadFail: 'fetchCurrentBalance',
        });
      });
  }

  fetchRecentTransaction() {
    const {userId} = store.data.userData;
    axios.get(`${serverUrl}/wallets/${userId}/transactions?recent=5`)
      .then((response) => {
        this.setState({
          transactions: response.data,
        });
      }).catch((error) => {
        this.setState({
          ApiLoadFail: 'fetchRecentTransaction',
        });
      });
  }

  render() {
    return (
      <div>
        <h2>Welcome</h2>
        <div className="line" />
        <WidgetCurrentBalance sendCurrentBalance={this.state.CurrentBalance} />
        <div className="line" />
        <WidgetRecentTransaction />
      </div>
    );
  }
}
