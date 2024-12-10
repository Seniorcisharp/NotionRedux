import {
  SET_USER,
  SET_NOTES,
  SET_ERROR,
  SET_LOADING,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  LOGOUT_USER,
} from "./actions";

const initialState = {
  user: null,
  notes: [],
  error: null,
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };      
      case LOGOUT_USER:
        return {
          ...state,
          user: null,
        };
    case SET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };

    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };

    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          String(note.id) === String(action.payload.id)
            ? { ...note, ...action.payload }
            : note
        ),
      };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(
          (note) => String(note.id) !== String(action.payload)
        ),
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;