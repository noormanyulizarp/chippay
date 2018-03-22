import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import store from 'simple-global-store';
import swal from 'sweetalert2';
import serverUrl from '../../../ServerUrl';

export default function SideNavigation(props) {
  const { sendActiveClass } = props;
  return (
      <nav
          id="sidebar"
          className={sendActiveClass ? 'active shadowing-right' : 'shadowing-right'}
      >
        <div className="sidebar-header">
          <h3>Chippay</h3>
          <strong>CP</strong>
        </div>
        <ul className="list-unstyled components">
          <li>
            <Link to="/" className="color-white">
              <i className="fa fa-home" />Dasboard
            </Link>
            <Link to="/Transaction" className="color-white">
              <i className="fa fa-list-alt" /><span className="more-little">Transaction</span>
            </Link>
            <Link to="/Payee" className="color-white">
              <i className="fa fa-address-book" />Payee
            </Link>
            <Link to="/Send" className="color-white">
              <i className="fa fa-money" />Send
            </Link>
            <Link to="/TopUpBalance" className="color-white">
              <i className="fa fa-plus-circle" />Top Up Balance
            </Link>
            <Link to="route" target="_blank" className="color-white" onClick={(event) => {
              event.preventDefault();
              axios.delete(`${serverUrl}/logout`).then(() => {
                swal({
                  title: 'Goodbye',
                  text: 'Successfully logout. See you later!',
                  type: 'success',
                });
                store.update({ isLoggedIn: false, userData: null });
              });
            }}>
              <i className="fa fa-plus-circle" />Logout
            </Link>
          </li>
        </ul>
      </nav>
  );
}

SideNavigation.propTypes = {
  sendActiveClass: PropTypes.bool.isRequired,
};
