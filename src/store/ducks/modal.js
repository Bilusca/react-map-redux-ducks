export const Types = {
  OPEN_MODAL: "modal/OPEN_MODAL",
  CLOSE_MODAL: "modal/CLOSE_MODAL"
};

const INITIAL_STATE = {
  open: false,
  cordinates: {}
};

export default function modal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.OPEN_MODAL:
      return {
        open: true,
        cordinates: { ...action.payload.cordinates }
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
  openModal: cordinates => ({
    type: Types.OPEN_MODAL,
    payload: {
      cordinates
    }
  }),
  closeModal: () => ({
    type: Types.CLOSE_MODAL
  })
};
