import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/jquery/dist/jquery';
import App from './js/component/App';

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    ,
    document.getElementById('root'),
);
