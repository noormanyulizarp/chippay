import React from 'react';

export default function PayeeRow(props) {
  return props.payeeItem.map((transaction, index) => (
      <tr key={index.toString()}>
        <td id={`payeeName${index}`} className="border-th-right">{transaction.name}</td>
        <td id={`payeeTag${index}`} className="border-th-right">{transaction.chip_tag}</td>
        <td id={`payeeEmail${index}`} className="border-th-right">{transaction.email}</td>
      </tr>
  ));
}
