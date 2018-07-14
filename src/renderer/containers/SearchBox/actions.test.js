import { expect } from 'chai';
import sinon from 'sinon';
import electron from 'electron';
jest.mock('../../lib/debounce');
import debounce from '../../lib/debounce';
import {
  HIDE_WINDOW,
  FETCH_SUGGESTIONS,
  FETCH_SUGGESTIONS_FAILURE,
  FETCH_SUGGESTIONS_SUCCESS,
  SELECT_SUGGESTION,
  SELECT_SUGGESTION_FAILURE,
  SELECT_SUGGESTION_SUCCESS,
  UPDATE_SEARCH_VALUE,
} from './types';

describe('containers/SearchBox/actions', () => {
  let fetchSuggestions;
  let selectSuggestion;
  let updateSearchValue;
  const mockDebouncedResolveSearch = sinon.stub().returns(Promise.resolve());

  beforeAll(() => {
    debounce.mockReturnValue(mockDebouncedResolveSearch);
    fetchSuggestions = require('./actions').fetchSuggestions;
    selectSuggestion = require('./actions').selectSuggestion;
    updateSearchValue = require('./actions').updateSearchValue;
  });

  afterAll(() => {
    jest.unmock('electron');
  });

  describe('hideWindow', () => {
    const dispatch = sinon.spy();
    const sandbox = sinon.createSandbox();

    afterEach(() => {
      dispatch.resetHistory();
      sandbox.restore();
    });

    it('should HIDE_WINDOW', () => {
      require('./actions').hideWindow()(dispatch);

      expect(dispatch).to.have.been.calledWith({
        type: HIDE_WINDOW,
      });
    });

    it('should call ipcRenderer `hide-window`', () => {
      sandbox.stub(electron.ipcRenderer, 'send');
      require('./actions').hideWindow()(dispatch);

      expect(electron.ipcRenderer.send).to.have.been.calledWith('hide-window');
    });
  });

  describe('fetchSuggestions', () => {
    const dispatch = sinon.stub().returns(Promise.resolve({ json: () => [] }));
    const sandbox = sinon.createSandbox();
    window.fetch = window.fetch || (() => null);

    beforeEach(() => {
      const resp = { json: sinon.spy() };
      sandbox.stub(window, 'fetch').returns(Promise.resolve(resp));
    });

    afterEach(() => {
      debounce.mockClear();
      dispatch.resetHistory();
      sandbox.restore();
    });

    afterAll(() => {
      jest.unmock('../../lib/resolve-search');
      jest.unmock('../../lib/debounce');
    });

    it('should dispatch FETCH_SUGGESTIONS', () => {
      const query = 'mdn isArray';
      fetchSuggestions(query)(dispatch);

      expect(dispatch).to.have.been.calledWith({
        type: FETCH_SUGGESTIONS,
        query,
      });
    });

    it('should call a debounced resolveSearch to fetch suggestions', () => {
      const query = 'mdn isNotArray';
      
      return fetchSuggestions(query)(dispatch)
        .then(() => {
          expect(mockDebouncedResolveSearch).to.have.been.calledWith(query);
        });
    });

    it('should dispatch FETCH_SUGGESTIONS_FAILED upon failure', () => {
      const error = new Error();
      mockDebouncedResolveSearch.rejects(error);

      return fetchSuggestions('search value')(dispatch)
        .then(() => expect(false).to.equal(true))
        .catch(error =>
          expect(dispatch).to.have.been.calledWith({
            type: FETCH_SUGGESTIONS_FAILURE,
            error,
          })
        );
    });

    it('should dispatch FETCH_SUGGESTIONS_SUCCESS upon success', () => {
      const suggestions = [
        {
          title: 'Suggestion title2',
        },
      ];
      mockDebouncedResolveSearch.resolves(suggestions);

      return fetchSuggestions('sea')(dispatch)
        .then(() =>
          expect(dispatch).to.have.been.calledWith({
            type: FETCH_SUGGESTIONS_SUCCESS,
            suggestions,
          })
        );
    });
  });

  describe('selectSuggestion', () => {
    const dispatch = sinon.stub();

    beforeAll(() => {
      sinon.stub(electron.shell, 'openExternal');
    });

    afterEach(() => {
      dispatch.resetHistory();
    });

    it('should SELECT_SUGGESTION', () => {
      const suggestion = {
        title: 'Very good alternative',
        url: 'https://astalavista.box.ck',
      };
      selectSuggestion(suggestion)(dispatch);

      expect(dispatch).to.have.been.calledWith({
        type: SELECT_SUGGESTION,
        suggestion,
      });
    });

    it('should call shell.openExternal with provided suggestion url', () => {
      const suggestion = {
        url: 'https://url.to/open',
      };
      selectSuggestion(suggestion)(dispatch);

      expect(electron.shell.openExternal).to.have.been.calledWith(suggestion.url);
    });

    it('should dispatch SELECT_SUGGESTION_FAILURE upon success', () => {
      electron.shell.openExternal.returns(false);
      const suggestion = {
        url: 'success url',
      };
      selectSuggestion(suggestion)(dispatch);

      expect(dispatch).to.have.been.calledWith({
        type: SELECT_SUGGESTION_FAILURE,
      });
    });

    it('should dispatch SELECT_SUGGESTION_SUCCESS upon success', () => {
      electron.shell.openExternal.returns(true);
      const suggestion = {
        url: 'success url',
      };
      selectSuggestion(suggestion)(dispatch);

      expect(dispatch).to.have.been.calledWith({
        type: SELECT_SUGGESTION_SUCCESS,
        suggestion,
      });
    });
  });

  describe('updateSearchValue', () => {
    it('should UPDATE_SEARCH_VALUE', () => {
      const query = 'Sökaren har ingenstans att gå.';
      const action = updateSearchValue(query);

      expect(action).to.eql({
        type: UPDATE_SEARCH_VALUE,
        query,
      });
    });
  });
});
