'use strict';

var api = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srlimit=12&srprop=snippet&srsearch=';

var btnSearch = document.getElementById('btn-search');
var inputSearch = document.getElementById('input-search');
var btnRandom = document.getElementById('btn-random');
var contentsWrapper = document.getElementById('contents__wrapper');

btnRandom.addEventListener('click', function () {
  return window.open('https://en.wikipedia.org/wiki/Special:Random');
});

btnSearch.addEventListener('click', function (e) {
  e.preventDefault();
  contentsWrapper.innerHTML = '';
  var loader = document.createElement('div');
  loader.className = 'loader';
  contentsWrapper.appendChild(loader);
  var search = inputSearch.value;
  var articlesPromise = fetch('' + api + search);
  articlesPromise.then(function (articles) {
    return articles.json();
  }).then(function (articles) {
    return articles.query.search.forEach(function (article) {
      var divContent = document.createElement('div');
      var itemTitle = document.createElement('h1');
      var itemSnippet = document.createElement('div');
      var link = document.createElement('a');
      divContent.className = 'content__item';
      itemTitle.className = 'item__title';
      itemSnippet.className = 'item__snippet';
      itemTitle.innerText = '' + article.title;
      itemSnippet.innerHTML = '' + article.snippet;
      link.setAttribute('href', 'https://en.wikipedia.org/wiki/' + article.title.replace(/\s/g, '_'));
      link.setAttribute('target', '_blank');
      link.appendChild(itemTitle);
      divContent.appendChild(link);
      divContent.appendChild(itemSnippet);
      loader.remove();
      contentsWrapper.appendChild(divContent);
    });
  }).catch(function () {
    return console.log('ooops');
  });
});