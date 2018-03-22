import React, { Component } from 'react';

export default class AddPayee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputAddPayee: '',
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeInput(event) {
    this.setState({ inputAddPayee: event.target.value });
  }

  onSubmit() {
    this.props.handlePayeeAdd(this.state.inputAddPayee);
  }

  render() {
    return (
        <div>
          <div className="line"/>
          <h4 className="first-header">Add Payee</h4>
          <div className="Form-wrapper">
            <div
                id="transaction-form"
                className="form-inline">
              <div className="form-group mx-sm-3 no-margin-bottom">
                <input
                    id="input-payee"
                    type="text"
                    className="payee-input form-control"
                    placeholder="add tag here"
                    onChange={this.onChangeInput}
                />
              </div>
              <button
                  id="transaction-form__save"
                  value="Add"
                  onClick={this.onSubmit}
                  className="btn btn-outline-info">
                Check
              </button>
            </div>
          </div>
        </div>
    );
  }
}