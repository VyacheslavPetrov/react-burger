import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal'

const initialState = {
  visible: false,
  content: null
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        visible: true,
        content: action.content
      };
    }
    case CLOSE_MODAL: {
      return {
        visible: false,
        content: null
      };
    }

    default: {
      return state;
    }
  }
}