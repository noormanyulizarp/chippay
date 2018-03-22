import axios from 'axios/index';
import React, { Component } from 'react';
import store from 'simple-global-store';
import SendList from './SendList';
import SendStep from './SendStep';
import serverUrl from '../../../ServerUrl';

export default class SendMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiLoadFail: 'none',
      sendContactData: [],
      sentChipTag: '',
      showSendStep: false,
      selectedContact: undefined,
    };
    this.loadsendContactList = this.loadsendContactList.bind(this);
    this.handleActionSend = this.handleActionSend.bind(this);
    this.propsHandleCancel = this.propsHandleCancel.bind(this);
  }

  componentDidMount() {
    this.loadsendContactList();
  }

  loadsendContactList() {
    const { userId } = store.data.userData;
    axios.get(`${serverUrl}/users/${userId}/payees`)
      .then((response) => {
        this.setState({
          sendContactData: response.data.data,
        });
      }).catch((err) => {
        this.setState({
          apiLoadFail: 'loadsendContactList',
        });
      });
  }

  handleActionSend(dataIndex) {
    const selectedContact = this.state.sendContactData[dataIndex];
    this.setState({
      showSendStep: true,
      selectedContact,
    });
  }

  propsHandleCancel() {
    this.setState({
      showSendStep: false,
    });
  }

  render() {
    return (
      <div>
        <h2>Send Money</h2>
        <div className="line" />
        {
            this.state.showSendStep &&
            <SendStep
              {...this.state.selectedContact}
              propsHandleCancel={this.propsHandleCancel}
            />
          }
        <SendList
          sendContactData={this.state.sendContactData}
          actionSend={this.handleActionSend}
        />
      </div>
    );
  }
}
