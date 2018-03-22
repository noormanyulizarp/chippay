import React from 'react';

export default function WidgetCurrentBalance(props) {
  return (
    <div id="current-balance-section" className="row current-balance-container padding-left-right min-height shadowing-left triple-color">
      <div className="col-md-2 current-balance content-be-header">
        <span className="current-title">Current Balance</span>
      </div>
      <div className="row col-md-10 current-balance content-center">
        <div className="col-md-1 col-xs-1 money-balance content-center">
          <span className="current-title">IDR</span>
        </div>
        <div id="value-current-balance" className="col-md-11 col-xs-11 money-balance content-center">
          <span id="money-value" className="monkey-money">{props.sendCurrentBalance}</span>
        </div>
      </div>
    </div>
  );
}
