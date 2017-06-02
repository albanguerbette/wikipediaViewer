const api =
  'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srlimit=12&srprop=snippet&srsearch=';

const btnSearch = document.getElementById('btn-search');
const inputSearch = document.getElementById('input-search');
const btnRandom = document.getElementById('btn-random');
const contentsWrapper = document.getElementById('contents__wrapper');

btnRandom.addEventListener('click', () =>
  window.open('https://en.wikipedia.org/wiki/Special:Random')
);

btnSearch.addEventListener('click', (e) => {
  e.preventDefault();
  contentsWrapper.innerHTML = '';
  const loader = document.createElement('div');
  loader.className = 'loader';
  contentsWrapper.appendChild(loader);
  const search = inputSearch.value;
  const articlesPromise = fetch(`${api}${search}`);
  articlesPromise
    .then(articles => articles.json())
    .then(articles =>
      articles.query.search.forEach((article) => {
        const divContent = document.createElement('div');
        const itemTitle = document.createElement('h1');
        const itemSnippet = document.createElement('div');
        const link = document.createElement('a');
        divContent.className = 'content__item';
        itemTitle.className = 'item__title';
        itemSnippet.className = 'item__snippet';
        itemTitle.innerText = `${article.title}`;
        itemSnippet.innerHTML = `${article.snippet}`;
        link.setAttribute(
          'href',
          `https://en.wikipedia.org/wiki/${article.title.replace(/\s/g, '_')}`
        );
        link.setAttribute('target', '_blank');
        link.appendChild(itemTitle);
        divContent.appendChild(link);
        divContent.appendChild(itemSnippet);
        loader.remove();
        contentsWrapper.appendChild(divContent);
      })
    )
    .catch(() => console.log('ooops'));
});
