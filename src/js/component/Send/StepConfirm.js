import axios from 'axios/index';
import React, { Component } from 'react';
import store from 'simple-global-store';
import swal from 'sweetalert2';
import UserImage from '../../../images/matthew.png';
import serverUrl from '../../../ServerUrl';

export default class StepConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passWordInput: '',
      inputPasswordValid: false,
    };
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handlePayeeAdd = this.handlePayeeAdd.bind(this);
  }

  onChangePassword(event) {
    this.setState({ passWordInput: event.target.value });
    this.validate(event.target.value);
  }

  handlePayeeAdd() {
    const { walletId } = store.data.userData;
    swal({
      title: 'Sending your money...',
      text: 'Please wait while we transfer your money safely',
      onOpen: () => {
        swal.showLoading();
      },
    });
    axios.post(`${serverUrl}/wallets/${walletId}/transfer`, {
      wallet_beneficiary: this.props.wallet_id,
      amount: this.props.transferAmount,
      user_id: 1,
      password: this.state.passWordInput,
      description: this.props.transferDescription,
    }).then((response) => {
      swal({
        type: 'success',
        title: 'Complete!',
        text: 'Transfer has been successfully completed.',
        onOpen: () => {
          swal.disableLoading();
        },
      });
      this.props.onResetForm();
    }).catch((error) => {
      swal({
        type: 'error',
        title: 'Oops!',
        text: error.response.data.message,
        onOpen: () => {
          swal.disableLoading();
        },
      });
      this.setState({ transactionFinish: false });
      this.props.onResetForm();
    });
    this.props.stepContactNext();
  }

  validate(passWordInput) {
    if (passWordInput !== null) {
      this.setState({ inputPasswordValid: true });
    }
    if (passWordInput === null || passWordInput === '') {
      this.setState({ inputPasswordValid: false });
    }
  }

  render() {
    return (
        <div id="step-form-wrapper"
             className="row current-balance-container min-height shadowing-left step-padding">
          <div className="card my-card card-margin">
            <img
                id="image-profile"
                className="card-img-top my-card_image"
                src={UserImage}
                alt="User image"/>
            <div className="card-body">
              <h5 className="card-title">{this.props.name}</h5>
              <button
                  onClick={this.props.propsHandleCancel}
                  className="btn btn-outline-dark"
              >
                cancel
              </button>
              <button
                  onClick={this.props.stepBack}
                  className="btn btn-outline-info card-button-margin"
              >
                back
              </button>
            </div>
          </div>

          <div className="card my-card card-margin card-infos">
            <div className="card-body">
              <h5 className="card-title">
                Insert password for validation
              </h5>
              <input
                  id="input-password"
                  type="password"
                  className="payee-input form-control input-transfer"
                  placeholder="insert password to show confirm button"
                  onChange={this.onChangePassword}
              />

              {
                this.state.inputPasswordValid &&
                <button
                    onClick={this.handlePayeeAdd}
                    id="transaction-form__save"
                    value="Add"
                    className="btn btn-outline-info">
                  confirm
                </button>
              }
            </div>
          </div>

        </div>
    );
  };
}
