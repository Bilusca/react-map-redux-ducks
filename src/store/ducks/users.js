/**
 * TYPES
 */
export const Types = {
  ADD_USER: "users/ADD_USER_REQUEST",
  ADD_SUCCESS: "users/ADD_USER_SUCCESS",
  ADD_FAILURE: "users/ADD_USER_FAILURE"
};
/**
 * REDUCERS
 */
const INITIAL_STATE = {
  loading: false,
  error: null,
  list: []
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_USER:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload.data],
        error: null
      };
    case Types.ADD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
/**
 * ACTIONS
 */
export const actionCreators = {
  addUserRequest: (user, cordinates) => ({
    type: Types.ADD_USER,
    payload: {
      user,
      cordinates
    }
  }),
  addUserSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: {
      data
    }
  }),
  addUserFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: {
      error
    }
  })
};
