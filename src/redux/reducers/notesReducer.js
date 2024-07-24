import {
  FETCH_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
} from "../actions/noteActions";

const initialState = [];

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTES:
      return action.payload;
    case ADD_NOTE:
      return [...state, action.payload];
    case DELETE_NOTE:
      return state.filter((note) => note.id !== action.payload.id);
    case EDIT_NOTE:
      return state.map((note) =>
        note.id === action.payload.id ? { ...note, ...action.payload } : note
      );
    default:
      return state;
  }
};

const initialStates = {
  isSuc: false,
  user: null,
  error: null,
};

 export const authReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isSuc: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isSuc: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isSuc: false,
        user: null,
        error: null,
      };
    case "LOGOUT_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default notesReducer;

