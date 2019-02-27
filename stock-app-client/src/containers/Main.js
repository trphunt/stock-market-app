import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';
import * as actions from '../actions';
import AuthForm from '../components/AuthForm';
import PrivateRoute from '../components/PrivateRoute';
import StockForm from '../components/StockForm';
import Homepage from '../components/Homepage';


class Main extends Component {
  constructor(props) {
    super(props);
    this.handleNewStock = this.handleNewStock.bind(this);
  }

  componentDidMount() {
    this.props.loadStocks();
  }

  handleNewStock(symbol) {
    const {newStock, history} = this.props;
    newStock(symbol).then(() => {
      history.push('/');
    });
  }
  
  render() {
    const {
      currentUser,
      authErrorMessage,
      handleSignIn,
      handleSignUp,
      stocks,
      history
    } = this.props;
    return (
      <div className="container">
        <Switch>
          <Route exact path='/signin' render={(props) => (
            <AuthForm
              signIn={true}
              heading={"Welcome Back."}
              buttonText={"Log in"}
              onAuth={(authInfo) => handleSignIn(authInfo).then(() => history.push('/')) }
              errorMessage={authErrorMessage}
              {...props}
            />
          )} />
          <Route exact path='/signup' render={(props) => (
            <AuthForm
              signIn={false}
              heading={"Join StockApp today."}
              buttonText={"Sign me up!"}
              onAuth={(authInfo) => handleSignUp(authInfo).then(() => history.push('/'))}
              errorMessage={authErrorMessage}
              {...props}
            />
          )} />
          <PrivateRoute
            path='/users/:id/stocks/new'
            currentUser={currentUser}
            component={StockForm}
            componentProps={{onSubmit: this.handleNewStock}}
          />
          <Route
            exact path='/'
            render={(props) => (
              <Homepage
                {...props}
                currentUser={currentUser}
                stocks={stocks}/>
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  stocks: state.stocks,
  errorMessage: state.errorMessage
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSignIn(authData) { return dispatch(actions.signIn(authData)); },
  handleSignUp(authData) { return dispatch(actions.signUp(authData)); },
  loadStocks() { return dispatch(actions.fetchStocks()); },
  newStock(symbol) {
    return dispatch(actions.postNewStock(symbol));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
