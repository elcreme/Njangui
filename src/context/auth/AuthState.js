import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import history from '../../history'
import jwt_decode from "jwt-decode";

import setAuthToken from '../../utils/setAuthToken';

import { REGISTER_SUCCESS, SET_CURRENT_USER, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS } from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        history: history,
        loading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {
        // if (localStorage.token) {
        //     setAuthToken(localStorage.token);
        // }
        
        try {
            const res = await axios.get('/api/auth');

            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);

            dispatch(
                setCurrentUser(decoded)
            );
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }

    // Register User
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        try {
            const res = await axios.post('/api/auth', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })

            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }




 // Login User
 const login = async formData => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const res = await axios.post('/api/auth', formData, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        loadUser();
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
        })
    }
}


    // Login User
    const login2 = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        try {
            const res = await axios.post('/api/auth', formData, config);

            // dispatch({
            //     type: LOGIN_SUCCESS,
            //     payload: res.data
            // })

            //loadUser();
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded), {
                type: LOGIN_SUCCESS,
                payload: res.data

            });
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    // Logout
    const logout = () => {
        dispatch({
            type: LOGOUT
        })

    }

    // Clear errors
    const clearErrors = () => dispatch({
        type: CLEAR_ERRORS
    });

    const setCurrentUser = decoded => {
        return {
            type: SET_CURRENT_USER,
            payload: decoded
        };
    };

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;