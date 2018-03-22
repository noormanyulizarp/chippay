import React, { Component } from 'react';
import '../../styles/App.css';
import '../../styles/Navigation.css';
import Authenticated from './Authenticated';
import Login from './Login';
import store from 'simple-global-store';
import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const { isLoggedIn, token } = store.data;
    if (isLoggedIn && token) {
      config.headers.Authorization = `Token ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      store.update(({ isLoggedIn: false, token: null }));
    } else {
      return Promise.reject(error);
    }
  },
);
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: {},
      token: null,
    };
    this._onStoreChange = this._onStoreChange.bind(this);
  }

  componentDidMount() {
    store.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    store.removeChangeListener(this._onStoreChange);
  }

  _onStoreChange() {
    this.setState(store.data);
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Authenticated />;
    }
    return <Login />;
  }
}

