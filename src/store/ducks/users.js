/**
 * TYPES
 */
export const Types = {
  ADD_USER: "users/ADD_USER"
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
    default:
      return state;
  }
}
/**
 * ACTIONS
 */
const actionCreators = {
  addUser: user => ({
    type: Types.ADD_USER,
    payload: {
      user
    }
  })
};
