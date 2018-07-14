import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';

import KeyListener from './';

describe('components/KeyListener', () => {
  it('should fire onKeyDownArrow upon ArrowDown keydown', () => {
    const onKeyDownArrow = sinon.spy();
    const wrapper = shallow(<KeyListener onKeyDownArrow={onKeyDownArrow} />);

    wrapper.simulate('keyDown', {
      key: 'ArrowDown',
    });

    expect(onKeyDownArrow).to.have.been.calledWith();
  });

  it('should fire onKeyUpArrow upon ArrowUp keydown', () => {
    const onKeyUpArrow = sinon.spy();
    const wrapper = shallow(<KeyListener onKeyUpArrow={onKeyUpArrow} />);

    wrapper.simulate('keyDown', {
      key: 'ArrowUp',
    });

    expect(onKeyUpArrow).to.have.been.calledWith();
  });

  it('should fire onKeyEnter upon Enter keydown', () => {
    const onKeyEnter = sinon.spy();
    const wrapper = shallow(<KeyListener onKeyEnter={onKeyEnter} />);

    wrapper.simulate('keyDown', {
      key: 'Enter',
    });

    expect(onKeyEnter).to.have.been.calledWith();
  });

  it('should fire onKeyEscape upon Escape keydown', () => {
    const onKeyEscape = sinon.spy();
    const wrapper = shallow(<KeyListener onKeyEscape={onKeyEscape} />);

    wrapper.simulate('keyDown', {
      key: 'Escape',
    });

    expect(onKeyEscape).to.have.been.calledWith();
  });
});

