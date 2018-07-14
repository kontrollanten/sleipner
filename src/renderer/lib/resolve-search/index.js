import searchGitHub from '../search-github';

export default query => {
  const [keyword, searchQuery] = query.split(/ (.+)/);

  switch (keyword) {
  case 'gh':
    return searchGitHub(searchQuery);
  case '':
    return Promise.resolve([]);
  default:
    return Promise.resolve([
      {
        title: `Search at duckduckgo for ${query}`,
        url: `https://duckduckgo.com/?q=${query}&ia=sleipner`,
      },
    ]);
  }
};
