import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../../styles/App.css';
import '../../styles/Navigation.css';
import Dasboard from './Dashboard';
import SideNavigation from './Navigation/SideNavigation';
import TopNavigation from './Navigation/TopNavigation';
import Payee from './Payee/Payee';
import SendMoney from './Send/SendMoney';
import TopUpBalance from './TopUp/TopUpBalance';
import TransactionList from './Transaction/TransactionList';
import Login from './Login';

class Authenticated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addClass: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ addClass: !this.state.addClass });
  }

  render() {
    return (
        <div className="wrapper cekks">
          <SideNavigation sendActiveClass={this.state.addClass}/>
          <div
              id="content"
              className={this.state.addClass
                  ? 'active render-wraper-inactive cekks'
                  : 'render-wrapper cekks'}
          >
            <TopNavigation pressMenuButton={true} onClickMenu={this.toggle}/>
            <Switch>
              <Route exact path="/" component={Dasboard}/>
              <Route path="/Transaction" component={TransactionList}/>
              <Route path="/Payee" component={Payee}/>
              <Route path="/Send" component={SendMoney}/>
              <Route path="/TopUpBalance" component={TopUpBalance}/>
            </Switch>
          </div>
        </div>
    );
  }
}

export default Authenticated;
