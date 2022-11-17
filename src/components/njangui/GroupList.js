import React, { Component, Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import PlaidLinkButton from "react-plaid-link-button";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import {
    getAllGroups, deleteGroup
} from "../../actions/groupActions";
import { logoutUser } from "../../actions/authActions";
import Spinner from "./Spinner";


class GroupList extends Component {

    componentDidMount() {
        console.log(this.auth);
        const { groups } = this.props;
        this.props.getAllGroups(groups);

    }


    // Delete account
    onDeleteClick = id => {
        const { groups } = this.props;
        const groupData = {
            id: id,
            groups: groups
        };
        this.props.deleteGroup(groupData);
    };

    // Logout
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };



    render() {

        const { user } = this.props.auth;
        const { groups, groupsLoading } = this.props.groups;

        let groupItems;
        if (groups === null || groupsLoading) {
            groupItems = <Spinner />
        } else if (groups.length > 0) {
            // User has accounts linked
            groupItems = groups.map(group => (
                <li key={group._id} style={{ marginTop: "1rem" }}>
                  <button
                    style={{ marginRight: "1rem" }}
                    onClick={this.onDeleteClick.bind(this, group._id)}
                    className="btn btn-small btn-floating waves-effect waves-light hoverable red accent-3"
                  >
                    <i className="material-icons">delete</i>
                  </button>
                  <b>{group.name}</b>
                </li>
              )); 
        } else {
            groupItems = (
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Welcome,</b> {user.name.split(" ")[0]}
                        </h4>
                    </div>
                </div>
            );
        }
        return <div className="container">{groupItems}</div>;
    }





}

GroupList.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getAllGroups: PropTypes.func.isRequired,
    // addAccount: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    groups: PropTypes.array.isRequired,
    // plaid: PropTypes.object.isRequired,
    //user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    // plaid: state.plaid,
    groups: state.groups,
    auth: state.auth,

});

export default connect(
    mapStateToProps,
    { getAllGroups, deleteGroup }
)(GroupList);
