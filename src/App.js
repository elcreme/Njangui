import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';

import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Link from "./components/auth/Link";
import CreateGroup from "./components/njangui/CreateGroup";
import GroupList from "./components/njangui/GroupList";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import ProfileState from './context/profiles/ProfileState';
import PeersState from './context/peers/PeersState';
import GroupsState from './context/groups/GroupsState';


import { Container } from '@material-ui/core';
import history from './history';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

const GlobalState = (props) => {
  return (
    <AuthState>
      <AlertState>
        <ProfileState>
          <PeersState>
            <GroupsState>
              {props.children}
            </GroupsState>
          </PeersState>
        </ProfileState>
      </AlertState>
    </AuthState>
  )
}

class App extends Component {
  render() {
    return (
      <GlobalState>
        <Provider store={store}>
          <Router history={history}>
            <Container maxWidth="x1">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              {/* <Route exact path= "/link" component={Link}/> */}
              {/* <Route exact path= "/njangui" component={CreateGroup}/>
            <Route exact path= "/njanguis" component={GroupList}/> */}
              {/* <Route exact path= "/njangui" component={groupsContext}/> */}
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/njangui" component={CreateGroup} />
                <PrivateRoute exact path="/njanguis" component={GroupList} />
              </Switch>
            </Container>
          </Router>
        </Provider>
      </GlobalState>
    );
  }
}
export default App;
