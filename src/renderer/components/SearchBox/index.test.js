import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import KeyListener from '../KeyListener';
import SearchBox from './';
import Suggestion from '../Suggestion';

describe('components/SearchBox', () => {
  const defaultProps = {
    onChange: sinon.spy(),
    onEscape: sinon.spy(),
    onSelect: sinon.spy(),
    suggestions: [],
  };

  it('should render a KeyListener', () => {
    const wrapper = shallow(<SearchBox {...defaultProps} />);

    expect(wrapper.find(KeyListener).exists()).to.equal(true);
    expect(wrapper.find(KeyListener).prop('tabIndex')).to.equal('0');
  });

  it('should call onSelect upon keyEnter', () => {
    const suggestion = {
      title: 'Titel',
      url: 'https://',
    };
    const onSelect = sinon.spy();
    const wrapper = shallow(<SearchBox {...defaultProps} onSelect={onSelect} suggestions={[suggestion]} />);

    wrapper.setState({
      highlightedIndex: 0,
    });
    wrapper.simulate('keyEnter');

    expect(onSelect).to.have.been.calledWith(suggestion);
  });

  it('should call onEscape upon keyDownEscape when suggestions exists', () => {
    const suggestions = [
      {
        title: 'This sucks',
        url: 'https://',
      },
    ];
    const onEscape = sinon.spy();
    const wrapper = shallow(<SearchBox {...defaultProps} onEscape={onEscape} suggestions={suggestions} />);

    wrapper.simulate('keyEscape');

    expect(onEscape).to.have.been.calledWith();
  });

  it('should set accurate Suggestion to highlighted upon first keyDownArrow', () => {
    const suggestions = [
      {
        title: '',
        url: '',
      },
    ];
    const wrapper = shallow(<SearchBox {...defaultProps} suggestions={suggestions} />);

    wrapper.simulate('keyDownArrow');
    expect(wrapper.find(Suggestion).at(0).prop('highlighted')).to.equal(true);
  });

  it('should set accurate Suggestion to highlighted if keyDownArrow is at last suggestion', () => {
    const suggestions = [
      {
        title: '',
        url: '',
      },
      {
        title: '',
        url: '',
      },
    ];
    const wrapper = shallow(<SearchBox {...defaultProps} suggestions={suggestions} />);
    wrapper.setState({
      highlightedIndex: suggestions.length - 1,
    });

    wrapper.simulate('keyDownArrow');
    expect(wrapper.find(Suggestion).at(0).prop('highlighted')).to.equal(true);
  });

  it('should set accurate Suggestion to highlighted upon first keyUpArrow', () => {
    const suggestions = [
      {
        title: '',
        url: '',
      },
      {
        title: '',
        url: '',
      },
    ];
    const wrapper = shallow(<SearchBox {...defaultProps} suggestions={suggestions} />);

    wrapper.simulate('keyUpArrow');
    expect(wrapper.find(Suggestion).at(suggestions.length -1).prop('highlighted')).to.equal(true);
  });

  it('should set accurate Suggestion to highlighted upon keyUpArrow in the end', () => {
    const suggestions = [
      {
        title: '',
        url: '',
      },
      {
        title: '',
        url: '',
      },
    ];
    const wrapper = shallow(<SearchBox {...defaultProps} suggestions={suggestions} />);

    wrapper.setState({
      highlightedIndex: suggestions.length - 1,
    });

    wrapper.simulate('keyUpArrow');
    expect(wrapper.find(Suggestion).at(0).prop('highlighted')).to.equal(true);
  });

  it('should display a TextField', () => {
    const wrapper = shallow(<SearchBox {...defaultProps} />);

    expect(wrapper.find(TextField).exists()).to.equal(true);

    expect(wrapper.find(TextField).props()).to.contain({
      autoFocus: true,
      fullWidth: true,
      placeholder: 'What do you want to know?',
      value: '',
    });
  });

  it('should call onChange upon TextField onChange', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(<SearchBox {...defaultProps} onChange={onChange} />);

    const event = {
      target: {
        value: 'Välkommen till värden',
      },
    };
    wrapper.find(TextField).simulate('change', event);

    expect(onChange).to.have.been.calledWith(event.target.value);
  });

  it('should set the TextField value from props', () => {
    const query = 'Hyresvärden';
    const wrapper = shallow(<SearchBox {...defaultProps} query={query} />);

    expect(wrapper.find(TextField).prop('value')).to.equal(query);
  });

  it('should not display any Paper if there\'s no suggestions given', () => {
    const wrapper = shallow(<SearchBox {...defaultProps} suggestions={[]} />);

    expect(wrapper.find(Paper).prop('open')).to.equal(false);
  });

  it('should display a Paper when suggestions are given', () => {
    const suggestions = [
      {
        title: 'Select me',
        url: '',
      },
    ];
    const wrapper = shallow(<SearchBox {...defaultProps} suggestions={suggestions} />);

    expect(wrapper.find(Paper).exists()).to.equal(true);
  });

  it('should render a Suggestion for each given suggestion', () => {
    const suggestions = [
      {
        title: 'Första',
        url: 'https://first.url.in.the.world',
      },
      {
        title: 'Andra',
        url: 'https://second.url.in.the.world',
      },
    ];
    const wrapper = shallow(<SearchBox {...defaultProps} suggestions={suggestions} />);

    expect(wrapper.find(Suggestion).length).to.equal(suggestions.length);

    wrapper.find(Suggestion).forEach((item, index) => {
      expect(item.prop('title')).to.contain(suggestions[index].title);
    });
  });
});
