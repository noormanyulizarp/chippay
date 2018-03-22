import axios from 'axios';
import React, { Component } from 'react';
import store from 'simple-global-store';
import swal from 'sweetalert2';
import serverUrl from '../../../ServerUrl';
import topUpBalanceValidator from '../../schemas/topUpBalanceValidator';

export default class TopUpBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topUpAmount: '',
      isSuccess: undefined,
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeInput(event) {
    this.setState({ topUpAmount: event.target.value });
  }

  onSubmit() {
    const validator = topUpBalanceValidator(this.state);
    if (validator === undefined) {
      const { topUpAmount } = this.state;
      swal.queue([
        {
          title: 'Are you sure?',
          confirmButtonText: 'Yes, proceed',
          text: `You will top up your balance with ${topUpAmount}`,
          showLoaderOnConfirm: true,
          preConfirm: () => new Promise((resolve, reject) => {
            const { walletTag } = store.data.userData;
            const request = {
              method: 'PATCH',
              url: `${serverUrl}/wallets/${walletTag}`,
              data: { topUpAmount },
            };
            return axios(request)
              .then((response) => {
                swal({
                  type: 'success',
                  title: 'Top Up Success!',
                  text: `Your balance has been increased by ${topUpAmount}`,
                });
                this.setState({
                  isSuccess: true,
                });
              })
              .catch(() => {
                swal.insertQueueStep({
                  type: 'error',
                  title: 'We`re sorry',
                  text: 'Something went wrong. We will get to you soon',
                });
                this.setState({
                  isSuccess: false,
                });
              });
          }),
        },
      ]);
    } else {
      swal({
        type: 'error',
        title: 'Oops...',
        text: `${validator.topUpAmount}`,
      });
    }
  }

  render() {
    return (
      <div>
        <h4 className="first-header">Top Up Balance</h4>
        <div className="line" />
        <div className="Form-wrapper">
          <div
            id="transaction-form"
            className="form-inline"
          >
            <label>Amount</label>
            <div className="form-group mx-sm-3 no-margin-bottom">
              <input
                id="input-top-up-amount"
                type="number"
                min="0"
                value={this.state.topUpAmount}
                className="top-up-amount-input form-control"
                placeholder="Insert amount here"
                onChange={this.onChangeInput}
              />
            </div>
            <button
              id="transaction-form__save"
              value="Add"
              onClick={this.onSubmit}
              className="btn btn-outline-info"
            >
                Add My Balance!
            </button>
          </div>
        </div>
      </div>
    );
  }
}
