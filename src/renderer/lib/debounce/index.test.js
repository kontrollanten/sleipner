import { expect } from 'chai';
import sinon from 'sinon';

import debounce from './';

describe('lib/debounce', () => {
  const fakeTimer = sinon.useFakeTimers();

  it('should return a promise', () => {
    expect(debounce(() => null)().then).to.be.ok;
  });

  it('should only call function once', () => {
    const callback = sinon.spy();
    const debouncedCallback = debounce(callback, 500);

    debouncedCallback(1, 2, 3)
      .then(() => null);
    debouncedCallback(1, 2, 3)
      .then(() => null);
    debouncedCallback(1, 2, 3)
      .then(() => null);

    expect(callback).to.not.have.been.called;

    const correctArgs = [4, 5, 6];

    debouncedCallback(...correctArgs)
      .then(() => null);
    fakeTimer.runAll();

    expect(callback).to.have.been.calledOnce;
    expect(callback).to.have.been.calledWith(...correctArgs);
  });
});
