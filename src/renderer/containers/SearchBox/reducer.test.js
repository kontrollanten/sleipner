import { expect } from 'chai';

import {
  HIDE_WINDOW,
  FETCH_SUGGESTIONS,
  FETCH_SUGGESTIONS_FAILURE,
  FETCH_SUGGESTIONS_SUCCESS,
  UPDATE_SEARCH_VALUE,
} from './types';
import SearchBox from './reducer';

describe('containers/SearchBox/reducer', () => {
  it('should clear suggestions and query upon HIDE_WINDOW', () => {
    const oldState = {
      suggestions: [{}],
      query: 'gh freja',
    };
    const state = SearchBox(oldState, {
      type: HIDE_WINDOW,
    });

    expect(state.suggestions).to.eql([]);
    expect(state.query).to.equal('');
  });

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
