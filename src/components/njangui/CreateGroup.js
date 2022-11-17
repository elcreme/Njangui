import React, { Component, useState, useContext, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createGroup } from "../../actions/groupActions";
import classnames from "classnames";
import { logoutUser } from "../../actions/authActions";



class CreateGroup extends Component {

  constructor() {

    super();
    this.state = {
      name: "",
      description: "",
      max_members: "",
      city: "",
      state: "",
      errors: {}
    };

  }

  componentDidMount() {

    // If logged in and user navigates to Register page, should redirect them to dashboard
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }
  }

  // Logout
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    console.log(e);
    const newGroup = {
      user: this.props.auth,
      name: this.state.name,
      description: this.state.description,
      max_members: this.state.max_members,
      city: this.state.city,
      state: this.state.state
    };
    console.log(JSON.stringify(this.props.auth));
    this.props.createGroup(newGroup, this.props.history);
  };

  render() {

    const { errors } = this.state;
    // const {name, course, description, max_members} = group;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.description}
                  error={errors.description}
                  id="description"
                  type="text"
                  className={classnames("", {
                    invalid: errors.description
                  })}
                />
                <label htmlFor="description">Description</label>
                <span className="red-text">{errors.description}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.max_members}
                  error={errors.max_members}
                  id="max_members"
                  type="number"
                  className={classnames("", {
                    invalid: errors.max_members
                  })}
                />
                <label htmlFor="description">Max Members</label>
                <span className="red-text">{errors.max_members}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Create Njangui
                </button>
                <button
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable red accent-3 main-btn"
                >
                  Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

CreateGroup.propTypes = {
  createGroup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createGroup,logoutUser }
)(withRouter(CreateGroup));