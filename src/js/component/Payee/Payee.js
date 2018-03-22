import axios from 'axios';
import React, { Component } from 'react';
import AddPayee from './AddPayee';
import CheckPayee from './CheckPayee';
import PayeeList from './PayeeList';
import serverUrl from '../../../ServerUrl';
import swal from 'sweetalert2';
import store from 'simple-global-store';

export default class Payee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payeesData: [],
      insertedChipTag: '',
      chipTagName: '',
      isTargetPayeeLoaded: false,
      chipTagEmail: '',
      isTargetPayeeNotFound: false,
    };
    this.handlePayeeAdd = this.handlePayeeAdd.bind(this);
    this.checkExistChipTag = this.checkExistChipTag.bind(this);
    this._loadPayees = this._loadPayees.bind(this);
  }

  componentDidMount() {
    this._loadPayees();
  }

  submitPayee() {
    this.props.handlePayeeAdd(this.state.inputAddPayee);
  }

  handlePayeeAdd() {
    const { userId } = store.data.userData;
    axios({
      method: 'POST',
      url: `${serverUrl}/users/${userId}/payees`,
      data: {
        chip_tag: this.state.insertedChipTag,
      },
    }).then(() => {
      this.setState({
        isTargetPayeeNotFound: false,
        isTargetPayeeLoaded: false,
      });
      this._loadPayees();
    }).catch((error) => {
      console.log('error add', error);
    });
  }

  checkExistChipTag(chipTag) {
    const { walletTag } = store.data.userData;

    if(walletTag === chipTag) {
      swal({
        type: 'error',
        title: 'Oops',
        text: 'You cannot add yourself!'
      });
    } else {
      axios({
        method: 'GET',
        url: `${serverUrl}/wallets?chip_tag=${chipTag}`,
      }).then((response) => {
        const { name, email } = response.data;
        this.setState({
          insertedChipTag: chipTag,
          isTargetPayeeNotFound: false,
          isTargetPayeeLoaded: true,
          chipTagName: name,
          chipTagEmail: email,
        });
      }).catch((error) => {
        this.setState({
          insertedChipTag: '',
          isTargetPayeeNotFound: true,
        });
      });
    }
  }

  _loadPayees() {
    const { userId } = store.data.userData;
    axios.get(`${serverUrl}/users/${userId}/payees`)
      .then((response) => {
        this.setState({
          payeesData: response.data.data,
        });
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    const dataToRender = this.state.payeesData;
    return (
      <div>
        <h2> Payee </h2>
        <CheckPayee handlePayeeAdd={this.checkExistChipTag} />
        {
            this.state.isTargetPayeeNotFound ?
              <p id="payee-not-found" className="text-alert">Your friend was not found</p> : null
          }
        {
            this.state.isTargetPayeeLoaded && !this.state.isTargetPayeeNotFound ?
              <AddPayee
                submitPayee={this.handlePayeeAdd}
                chipTagName={this.state.contactName}
                name={this.state.chipTagName}
                email={this.state.chipTagEmail}
              /> : null
          }
        <div className="table-wrapper table-preset">
          <PayeeList sendDataPayees={dataToRender} />
        </div>
      </div>
    );
  }
}
