import {
  HIDE_WINDOW,
  FETCH_SUGGESTIONS,
  FETCH_SUGGESTIONS_FAILURE,
  FETCH_SUGGESTIONS_SUCCESS,
  UPDATE_SEARCH_VALUE,
} from './types';

const initialState = {
  loading: 0,
  suggestions: [],
  query: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HIDE_WINDOW:
      return {
        ...state,
        suggestions: [],
        query: '',
      };
    case FETCH_SUGGESTIONS:
      return {
        ...state,
        loading: state.loading + 1,
      };
    case FETCH_SUGGESTIONS_FAILURE:
      return {
        ...state,
        loading: state.loading - 1,
      };
    case FETCH_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        loading: state.loading - 1,
        suggestions: action.suggestions,
      };
    case UPDATE_SEARCH_VALUE:
      return {
        ...state,
        query: action.query,
      };
  }

  return state;
};
