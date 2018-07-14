import { expect } from 'chai';
import sinon from 'sinon';

import searchGitHub from './';

describe('lib/search-github', () => {
  const sandbox = sinon.createSandbox();
  window.fetch = window.fetch || (() => null);

  beforeEach(() => {
    sandbox.stub(window, 'fetch').returns(Promise.resolve({
      json: () => ({ items: [] }),
    }));
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should fetch from GitHub API', () => {
    const query = 'sleipner';

    return searchGitHub(query)
      .then(() => {
        expect(window.fetch).to.have.been.calledWith(sinon.match(/github.com/));
      });
  });

  it('should return mapped JSON response', () => {
    const items = [
      {
        description: 'Allfader',
        full_name: 'Allfader Oden',
        html_url: 'https://valhal.la',
        owner: {
          avatar_url: 'https://images.midgård',
        },
      },
    ];
    window.fetch.returns(Promise.resolve({
      json: () => ({
        items,
      }),
    }));
    const query = 'oden';

    return searchGitHub(query)
      .then(suggestions => {
        expect(suggestions.length).to.equal(items.length);

        suggestions
          .forEach((sugg, index) => 
            expect(sugg).to.eql({
              description: items[index].description,
              image: items[index].owner.avatar_url,
              title: items[index].full_name,
              url: items[index].html_url,
            })
          );
      });
  });
});
