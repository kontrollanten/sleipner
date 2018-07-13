import { expect } from 'chai';

import {
  UPDATE_SEARCH_VALUE,
  FETCH_SUGGESTIONS,
  FETCH_SUGGESTIONS_FAILURE,
  FETCH_SUGGESTIONS_SUCCESS,
} from './types';
import SearchBox from './reducer';

describe('containers/SearchBox/reducer', () => {
  it('should increment loading upon FETCH_SUGGESTIONS', () => {
    const state = SearchBox(undefined, {
      type: FETCH_SUGGESTIONS,
    });

    expect(state.loading).to.equal(1);
  });

  it('should decrement loading upon FETCH_SUGGESTIONS_FAILURE', () => {
    const state = SearchBox({ loading: 1 }, {
      type: FETCH_SUGGESTIONS_FAILURE,
    });

    expect(state.loading).to.equal(0);
  });

  it('should decrement loading upon FETCH_SUGGESTIONS_SUCCESS', () => {
    const state = SearchBox({ loading: 1 }, {
      type: FETCH_SUGGESTIONS_SUCCESS,
    });

    expect(state.loading).to.equal(0);
  });

  it('should set suggestions upon FETCH_SUGGESTIONS_SUCCESS', () => {
    const suggestions = [
      {
        title: 'title',
      },
    ];
    const state = SearchBox(undefined, {
      type: FETCH_SUGGESTIONS_SUCCESS,
      suggestions,
    });

    expect(state.suggestions).to.eql(suggestions);
  });

  it('should update searchValue upon UPDATE_SEARCH_VALUE', () => {
    const query = 'caniuse fetch';
    const state = SearchBox(undefined, {
      type: UPDATE_SEARCH_VALUE,
      query,
    });

    expect(state.query).to.equal(query);
  });
});
