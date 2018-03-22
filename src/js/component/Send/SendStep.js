import React, { Component } from 'react';
import StepConfirm from './StepConfirm';
import StepForm from './StepForm';

export default class SendStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiLoadFail: '',
      step: 1,
      insertedChipTag: '',
      contactName: this.props.name,
      contactEmail: this.props.email,
      contactChipTag: this.props.chip_tag,
      wallet_id: this.props.wallet_id
    };
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    this.onSubmitFormAmount = this.onSubmitFormAmount.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      contactName: nextProps.name,
      contactEmail: nextProps.email,
      contactChipTag: nextProps.chip_tag,
      wallet_id: nextProps.wallet_id
    });
  }

  onSubmitFormAmount(amount, description) {
    this.setState({
      transferAmount: amount,
      transferDescription: description
    });
    this.next();
  }

  next() {
    this.setState({step: this.state.step + 1});
  }

  back() {
    this.setState({step: this.state.step - 1});
  }

  render() {
    switch (this.state.step) {
      case 'cancel':
        return (
          <div>Transaction canceled</div>
        );
      case 1:
        return (
          <StepForm
            stepFromMother={this.state.step}
            stepContactNext={this.next}
            onSubmitFormAmount={this.onSubmitFormAmount}
            name={this.state.contactName}
            email={this.state.contactEmail}
            propsHandleCancel={this.props.propsHandleCancel}
            propsHandleAmountDesc={this.propsHandleAmountDesc}
          />
        );
      case 2:
        return (
          <StepConfirm
            stepBack={this.back}
            stepFromMother={this.state.step}
            onResetForm={this.props.propsHandleCancel}
            stepContactNext={this.next}
            name={this.state.contactName}
            email={this.state.contactEmail}
            wallet_id={this.state.wallet_id}
            transferAmount={this.state.transferAmount}
            transferDescription={this.state.transferDescription}
            propsHandleCancel={this.props.propsHandleCancel}
          />
        );
      case 3:
        return (
          <div id="transaction-succes"></div>
        );
      default:
        break;
    }
  }
}
