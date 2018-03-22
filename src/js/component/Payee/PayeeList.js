import PropTypes from 'prop-types';
import React from 'react';
import PayeeRow from './PayeeRow';

export default function PayeeList(props) {
  return (
    <table className="table table-hover table-transaction-white table-shadow">
      <thead>
        <tr>
          <th className="border-th-right">User</th>
          <th className="border-th-right">Payee tag</th>
          <th className="border-th-right">email</th>
        </tr>
      </thead>
      <tbody>
        <PayeeRow payeeItem={props.sendDataPayees} />
      </tbody>
    </table>
  );
}

const dataPayee = PropTypes.shape({
  name: PropTypes.string,
  payee_tag: PropTypes.string,
  email: PropTypes.string,
});

PayeeList.propTypes = {
  sendDataPayees: PropTypes.arrayOf(dataPayee).isRequired,
};

