import React, { Component } from 'react';

export default class SendItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIndex: this.props.dataIndex,
    };
    this._onClickItem = this._onClickItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataIndex: nextProps.dataIndex,
    });
  }

  _onClickItem() {
    this.props.actionSend(this.state.dataIndex);
  }

  render() {
    const { name, chip_tag, email } = this.props.contact;
    return (
        <tr id="c" key={this.state.dataIndex}>
          <td className="border-th-right">{name}</td>
          <td className="border-th-right">{chip_tag}</td>
          <td className="border-th-right">{email}</td>
          <td className="border-th-right">
            <button className="btn btn-info" onClick={this._onClickItem}>Send</button>
          </td>
        </tr>
    );
  }
}
