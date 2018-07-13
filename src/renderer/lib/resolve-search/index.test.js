import { expect } from 'chai';
import sinon from 'sinon';

jest.mock('../search-github');
import searchGitHub from '../search-github';
import resolveSearch from './';

describe('lib/resolve-search', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  afterAll(() => {
    jest.unmock('../search-github');
  });

  it('should call searchGitHub when query starts with `gh`', () => {
    const returnValue = {};
    searchGitHub.mockReturnValue(returnValue);
    const query = 'gh sleipner';

    expect(resolveSearch(query)).to.equal(returnValue);
  });

  it('should return an empty array when there\'s no query', () => {
    return resolveSearch('')
      .then(results => {
        expect(results).to.eql([]);
      });
  });

  it('should use duckduckgo as fallback', () => {
    const searchQuery = 'this is interesting';
    const query = `unknown ${searchQuery}`;

    return resolveSearch(query)
      .then(results => {
        expect(results.length).to.equal(1);

        const [result] = results;
        expect(result.title).to.contain('Search at duckduckgo');
        expect(result.title).to.contain(query);
        expect(result.url).to.contain('duckduckgo.com');
        expect(result.url).to.contain(query);
      });
  });
});
