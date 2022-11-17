import axios from "axios";
import { GET_ERRORS, GET_GROUPS, DELETE_GROUP, SET_CURRENT_USER, GET_ACCOUNTS } from "./types";

// Create Group
export const createGroup = (groupData, history) => dispatch => {
  console.log(groupData);
  axios
    .post("/api/njangui/create", groupData)
    .then(res => history.push("/njanguis")(res))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllGroups = () => (dispatch) => {
  /*
    axios
      .get("/api/njangui/njanguis")
      .then(res =>
        dispatch({
          type: GET_GROUPS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_GROUPS,
          payload: err.message
        })
      );
  
  */

  try {

    axios.get('api/njangui/njanguis').then(res => {
      console.log(res.data);
      let groups = res.data.map(group => ({
        ...group,
        view: 'normal'
      }));  console.log(groups);
      dispatch({
        type: GET_GROUPS,
        payload: groups
      })
    }
    )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: null
        })
      );
    //console.log(res.data.groups);

    //let groups = res.payload.data
    //console.log(groups);
    // console.log(groups);
    // const groups =  res.data;
    //console.log(groups)
    // dispatch({
    //   type: GET_GROUPS,
    //   payload: groups
    // })
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_GROUPS,
      payload: err.response
    })
  }



};

// Delete account
export const deleteGroup = (groupData, history) => dispatch => {
  if (window.confirm("Are you sure you want to remove this Group?")) {
    const id = groupData.id;
    const newGroups = groupData.groups.filter(
      group => group._id !== id
    );
    axios
      .delete(`/api/njangui/delete/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_GROUP,
          payload: id
        })
      )
      //.then(newGroups ? dispatch(getTransactions(newGroups)) : null)
      .catch(err => console.log(err));
  }
};
