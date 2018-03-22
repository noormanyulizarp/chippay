import axios from 'axios';
import React, { Component } from 'react';
import store from 'simple-global-store';
import swal from 'sweetalert2';
import '../../styles/Login.css';
import serverUrl from '../../ServerUrl';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
    this._onChangeEmail = this._onChangeEmail.bind(this);
    this._onChangePassword = this._onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  _onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {
    swal({
      title: 'Authenticating...',
      text: 'Stand by...',
      onOpen: () => {
        swal.showLoading();
      },
    });
    axios({
      method: 'POST',
      url: `${serverUrl}/login`,
      data: {
        email: this.state.email,
        password: this.state.password,
      },
    }).then(({data}) => {
      swal.disableLoading();
      store.update({
        isLoggedIn: true,
        userData: data,
        token: data.token
      });
      swal({
        type: 'success',
        title: `Welcome back, ${data.userName}`,
        text: 'Enjoy the financial service in your hand'
      });
    }).catch((error) => {
      swal.disableLoading();
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Invalid email or password. Try again maybe?'
      });
    });
  }

  render(){
    return(
        <div className="login-form ketengahin background-it login-preset">
          <div>
            <h2 className="text-center header-login">CHIP Pay</h2>
            <div className="line" />
            <div className="form-group">
              <input type="text" className="form-control input-login-preset"
                     placeholder="Email" required="required"
                     value={this.state.email}
                     onChange={this._onChangeEmail}
              />
            </div>
            <div className="form-group">
              <input type="password" className="form-control input-login-preset"
                     placeholder="Password" required="required"
                     value={this.state.password}
                    onChange={this._onChangePassword}
              />
            </div>
            <div className="form-group">
              <button type="click" className="btn btn-dark btn-block button-rad"
                      onClick={this.handleSubmit}
              >Log in</button>
            </div>
          </div>
        </div>
    );
  }
}