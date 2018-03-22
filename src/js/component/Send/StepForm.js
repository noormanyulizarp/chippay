import React, { Component } from 'react';
import UserImage from '../../../images/matthew.png';

export default class StepForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputAmount : '',
      inputDescription: '',
      inputAmountInvalid: false
    };
    this.handleInputAmount = this.handleInputAmount.bind(this);
    this.handleInputDescription = this.handleInputDescription.bind(this);
    this.validate = this.validate.bind(this);
    this.onSubmitFormAmount = this.onSubmitFormAmount.bind(this);
  }

  onSubmitFormAmount() {
    const { inputAmount, inputDescription } = this.state;
    this.props.onSubmitFormAmount(inputAmount, inputDescription);
  }

  handleInputAmount(event){
    this.setState({inputAmount: event.target.value });
    this.validate(event.target.value);
  }

  handleInputDescription(event){
    this.setState({inputDescription: event.target.value });
  }

  validate(number){
    if(number < 0 || number === 0) {
      this.setState({inputAmountInvalid: true });
    }
    if(number > 0) {
      this.setState({inputAmountInvalid: false });
    }
  }
  render(){
    return (
        <div id="step-form-wrapper"
             className="row current-balance-container min-height shadowing-left step-padding">
          <div id="image-profile" className="card my-card card-margin">
            <img
                className="card-img-top my-card_image"
                src={UserImage}
                alt="user-profile"/>
            <div className="card-body">
              <h5 className="card-title">{this.props.name}</h5>
              <p className="card-text">{this.props.email}</p>
            </div>
          </div>

          <div className="card my-card card-margin card-infos">
            <div className="card-body">
              <div className="form-group mx-sm-1 no-margin-bottom">
                <h5 className="card-title">
                  Insert amount & description
                </h5>
                <input
                    id="input-number-transfer"
                    type="number"
                    className="payee-input form-control input-transfer"
                    placeholder="add amount here"
                    value={this.state.inputAmount}
                    onChange={this.handleInputAmount}
                />
                {this.state.inputAmountInvalid && <p>please correct your amount</p>}
                <input
                    id="input-description"
                    type="text"
                    className="payee-input form-control input-transfer"
                    placeholder="Insert Your Description"
                    value={this.state.inputDescription}
                    onChange={this.handleInputDescription}
                />
              </div>
              <button
                  onClick={this.props.propsHandleCancel}
                  className="btn btn-outline-dark card-button-margin"
              >
                cancel
              </button>
              <button
                  onClick={this.onSubmitFormAmount}
                  id="transaction-form__save"
                  value="Add"
                  className="btn btn-outline-info">
                next
              </button>
            </div>
          </div>
        </div>
    );
  }
}
