import PropTypes from 'prop-types';
import React, { Component } from 'react';
import UserImage from '../../../images/matthew.png';

export default class AddPayee extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="card my-card">
          <img
              className="card-img-top my-card_image"
              src={UserImage}
              alt="User image"/>
          <div className="card-body">
            <h5 className="card-title">{this.props.name}</h5>
            <p className="card-text">{this.props.email}</p>
            <button
                id="transaction-form__save"
                onClick={this.props.submitPayee}
                value="Add"
                className="btn btn-outline-info">
              Add
            </button>
          </div>
        </div>
    );
  }
}

const addPayee = PropTypes.shape({
  inputAddPayee: PropTypes.string,
});

AddPayee.propTypes = {
  handlePayeeAdd: PropTypes.arrayOf(addPayee).isRequired,
};
