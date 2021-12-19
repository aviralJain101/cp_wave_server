import React, { Component } from 'react';
import Home from './HomeComponent';
import Buy from './BuyComponent';
import BuyItemDetail from './BuyItemComponent';
import Sell from './Sell/SellComponent/MainComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Dashboard from './Dashboard/DashboardComponent';
import SellRouter from './Sell/SellRouter';
import MarketRouter from './Market/MarketRouter';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser, loginUser, logoutUser } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import jwt_decode from 'jwt-decode';
import { io } from "socket.io-client";
import { baseUrl } from '../shared/baseUrl';
import isEqual from 'lodash.isequal';

const mapStateToProps = state => {
    return {
      auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
  signupUser: (creds) => dispatch(signupUser(creds)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser())
});

class Main extends Component {

  componentDidMount() {
    const storedToken = localStorage.getItem("token");
    if (storedToken){
      let decodedData =jwt_decode(storedToken);
      let expirationDate = decodedData.exp;
        var current_time = Date.now() / 1000;
        if(expirationDate < current_time)
        {
          this.props.logoutUser();
        }
    }
    console.log("consolemounted")
  }
  

  render() {
    const HomePage = () => {
      return(
        <Home 
        />
      );
    }
    const DashboardPage = () => {
      return(
        <Dashboard 
          auth={this.props.auth}
        />
      );
    }

    const SellPage = ({match}) => {
      return(
        this.props.auth.isAuthenticated
        ?
        <SellRouter match={match}/>
        :
        <div>
          {this.props.history.push("/home")}
        </div>
      );
    }

    const MarketPage = ({match}) => {
      return(
        this.props.auth.isAuthenticated
        ?
        <MarketRouter match={match}/>
        :
        <div>
          {this.props.history.push("/home")}
        </div>
      );
    }


    return (
      <div>
        <Header auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser} 
          signupUser={this.props.signupUser}
          />   
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route path="/market" component={MarketPage} />
              <Route path="/sell" component={ SellPage } />
              <Route path="/:User" component={DashboardPage} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
