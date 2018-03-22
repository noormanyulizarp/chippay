import React from 'react';
import SendItem from './SendItem'

export default function SendList(props) {
  return (
      <div>
          <table id="send-lit-contact" className="table table-hover table-transaction-white table-shadow pad-left-right-conteent send-list">
            <thead id="send-lit-head" className="thead-style">
            <tr>
              <th className="border-th-right">User</th>
              <th className="border-th-right">Payee tag</th>
              <th className="border-th-right">Email</th>
              <th className="border-th-right">Action</th>
            </tr>
            </thead>
            <tbody>
            {
              props.sendContactData.map((contact, index) => (
                  <SendItem key={index.toString()} dataIndex={index.toString()} contact={contact} actionSend={props.actionSend}/>
              ))
            }
            </tbody>
          </table>
        <div className="line" />
      </div>
  );
}
