import React, { Component } from "react";
import { PlaidLinkButton } from "react-plaid-link-button";
import {
  PlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
} from 'react-plaid-link';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getAccounts, addAccount } from "../../actions/accountActions";

import Accounts from "./Accounts";
import Spinner from "./Spinner";

import axios from 'axios';

class Dashboard extends Component {
  constructor() {
    super();

  }
  state = {
    linkToken: "",
  };


  componentDidMount = async () => {
    this.props.getAccounts();
    // this.createLinkToken();
    //console.log(this.props.auth.user.name);

    // const request = {
    //   user_id: this.props.auth.user.id,
    //   username: this.props.auth.user.name
    // };
    //var response = await axios.post("/api/plaid/create_link_token", request).then(res => console.log(res.response.data)).catch(err => console.log(err.response.data));
    //axios.post("/create_link_token")
    //this.props.setState({ linkToken: response.data["link_token"] });
    //this.setState({ linkToken: response.data["link_token"] });
  }

  createGroupPage = e => {
    this.props.history.push("/njangui");
  }


  // Logout
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  // Add account
  handleOnSuccess = async (token, metadata) => {
    var plaidData = {
      public_token: token,
      metadata: metadata
    };
    //const response = await axios.post("/exchange_public_token", plaidData);
    //console.log(response)
    this.props.addAccount(plaidData);
    // sessionStorage.setItem("accessToken", response.data["access_token"]);
  };




  render() {
    const { user } = this.props.auth;
    const { accounts, accountsLoading } = this.props.plaid;
    const { linkToken } = this.state



    let dashboardContent;

    if (accounts === null || accountsLoading) {
      dashboardContent = <Spinner />;
    } else if (accounts?.length > 0) {
      // User has accounts linked
      dashboardContent = <Accounts user={user} accounts={accounts} />;
    } else {
      // User has no accounts linked
      dashboardContent = (
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Welcome,</b> {user.name.split(" ")[0]}
            </h4>
            <p className="flow-text grey-text text-darken-1">
              To get started, link your first bank account below
            </p>
            <div>
              {linkToken.toString !== 'undefined' ?
                <PlaidLink
                  token={linkToken.toString()}
                  env="sandbox"
                  onSuccess={this.handleOnSuccess}
                  onExit={this.handleOnExit}>
                  Connect Bank Account
                </PlaidLink>
                : null
              }
            </div>
            <div>
              <button
                onClick={this.createGroupPage}
                className="btn btn-large waves-effect waves-light hoverable red accent-3 main-btn"
              >
                Create Njangui
              </button>
            </div>
            <button
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable red accent-3 main-btn"
            >
              Logout
            </button>
          </div>
        </div>
      );
    }

    return <div className="container">{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getAccounts: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  plaid: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  plaid: state.plaid
});

export default connect(
  mapStateToProps,
  { logoutUser, getAccounts, addAccount }
)(Dashboard);
