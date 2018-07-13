import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai'; 
import sinon from 'sinon';

import * as actions from './actions';

import SearchBox from './';
import SearchBoxComponent from '../../components/SearchBox';

describe('containers/SearchBox', () => {
  const sandbox = sinon.createSandbox();
  const store = {
    dispatch: sinon.spy(),
    getState: sinon.stub().returns({
      searchBox: {
        suggestions: [],
      },
    }),
    subscribe: sinon.spy(),
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should return a connected SearchBox', () => {
    const wrapper = mount(<SearchBox store={store} />);

    expect(wrapper.find(SearchBoxComponent).exists()).to.equal(true);
  });

  it('should provide suggestions from store to SearchBox', () => {
    const suggestions = [
      {
        title: 'Titel',
        url: 'https://',
      },
    ];
    store.getState.returns({
      searchBox: {
        suggestions,
      },
    });
    const wrapper = mount(<SearchBox store={store} />);

    expect(wrapper.find(SearchBoxComponent).prop('suggestions')).to.eql(suggestions);
  });

  it('should provide query from store to SearchBox', () => {
    const query = 'caniuse css grid';
    const state = store.getState();
    store.getState.returns({
      ...state,
      searchBox: {
        ...state.searchBox,
        query,
      },
    });
    const wrapper = mount(<SearchBox store={store} />);

    expect(wrapper.find(SearchBoxComponent).prop('query')).to.equal(query);
  });

  it('should fetchSuggestions upon onChange', () => {
    sandbox.stub(actions, 'fetchSuggestions');
    const wrapper = mount(<SearchBox store={store} />);

    const query = 'Sökvärde';
    wrapper.find(SearchBoxComponent).prop('onChange')(query);

    expect(actions.fetchSuggestions).to.have.been.calledWith(query);
  });

  it('should call updateSearchValue upon onChange', () => {
    sandbox.stub(actions, 'updateSearchValue');
    const wrapper = mount(<SearchBox store={store} />);

    const query = 'Sök';
    wrapper.find(SearchBoxComponent).prop('onChange')(query);

    expect(actions.updateSearchValue).to.have.been.calledWith(query);
  });
});
