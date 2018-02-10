import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LoginContainer from './LoginContainer';
import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';
import './app.css'

class App extends Component {
  state = { user: null };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.props.history.push('/login');
      }
    });
  }
  render() {
    console.log(this.state)
    return (
      <div id="container" className="inner-container">
        <Route path="/login" component={LoginContainer} />
        <Route path="/users/:id" component={UserContainer} />
        <Route exact path="/" component={ChatContainer} />
      </div>
    );
  }
};

export default withRouter(App);
