export default query => {
  return fetch(`https://api.github.com/search/repositories?q=${query}`)
    .then(resp => resp.json())
    .then(resp => resp.items
      .map(item => ({
        description: item.description,
        image: item.owner.avatar_url,
        title: item.full_name,
        url: item.html_url,
      }))
    );
};
