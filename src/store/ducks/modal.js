export const Types = {
  OPEN_MODAL: "modal/OPEN_MODAL",
  CLOSE_MODAL: "modal/CLOSE_MODAL"
};

const INITIAL_STATE = {
  open: false,
  coordinates: {}
};

export default function modal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.OPEN_MODAL:
      return {
        open: true,
        coordinates: { ...action.payload.coordinates }
      };
    case Types.CLOSE_MODAL:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}

export const actionCreators = {
  openModal: coordinates => ({
    type: Types.OPEN_MODAL,
    payload: {
      coordinates
    }
  }),
  closeModal: () => ({
    type: Types.CLOSE_MODAL
  })
};
