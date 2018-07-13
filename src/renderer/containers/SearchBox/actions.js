import { shell } from 'electron';
import resolveSearch from '../../lib/resolve-search';
import debounce from '../../lib/debounce';
import {
  FETCH_SUGGESTIONS,
  FETCH_SUGGESTIONS_FAILURE,
  FETCH_SUGGESTIONS_SUCCESS,
  SELECT_SUGGESTION,
  SELECT_SUGGESTION_FAILURE,
  SELECT_SUGGESTION_SUCCESS,
  UPDATE_SEARCH_VALUE,
} from './types';

const debouncedResolveSearch = debounce(resolveSearch, 300);

export const fetchSuggestions = query => dispatch => {
  dispatch({
    type: FETCH_SUGGESTIONS,
    query,
  });

  return debouncedResolveSearch(query)
    .then(suggestions =>
      dispatch({
        type: FETCH_SUGGESTIONS_SUCCESS,
        suggestions,
      })
    )
    .catch(error => {
      dispatch({
        type: FETCH_SUGGESTIONS_FAILURE,
        error,
      });

      throw error;
    });
};

export const selectSuggestion = suggestion => dispatch => {
  dispatch({
    type: SELECT_SUGGESTION,
    suggestion,
  });

  const open = shell.openExternal(suggestion.url);

  if (open) {
    dispatch({
      type: SELECT_SUGGESTION_SUCCESS,
      suggestion,
    });
  } else {
    dispatch({
      type: SELECT_SUGGESTION_FAILURE,
    });
  }
};

export const updateSearchValue = query => ({
  type: UPDATE_SEARCH_VALUE,
  query,
});
