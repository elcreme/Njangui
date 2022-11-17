import {
    ADD_GROUP,
    GET_GROUPS,
    GROUPS_LOADING,
    DELETE_GROUP
  } from "../actions/types";
  
  const initialState = {
    groups: {},
    groupsLoading: false,
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GROUPS_LOADING:
        return {
          ...state,
          groupsLoading: true
        };
      case ADD_GROUP:
        return {
          ...state,
          groups: [action.payload, ...state.groups]
        };
      case DELETE_GROUP:
        return {
          ...state,
          groups: state.groups.filter(
            group => group._id !== action.payload
          )
        };
      case GET_GROUPS:
        return {
          ...state,
          groups: action.payload,
          groupsLoading: false
        };
      default:
        return state;
    }
  }
  