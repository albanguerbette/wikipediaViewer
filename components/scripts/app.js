$(document).ready(() => {
  const req = function req(textSearched) {
    const api =
      'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srlimit=12&srprop=snippet&srsearch=';
    const apiReq = `${api + textSearched}&callback=?`;

    $.getJSON(apiReq, (data) => {
      const template = $('#responsetpl').html();
      const html = Mustache.to_html(template, data);
      $('.js-app').html(html);
      $('.content__item').children('.item__title').wrap(function () {
        return `<a href="https://en.wikipedia.org/wiki/${$(this)
          .text()
          .replace(/\s/g, '_')}" target='_blank'></a>`;
      });
    });
  };

  const myInput = $('#textSearched');
  // Use Observable with debounceTime to avoid querying the api on each key stroke
  const obs = Rx.Observable.fromEvent(myInput, 'keyup');

  obs.debounceTime(500).map(event => event.target.value).subscribe((value) => {
    req(value);
  });
});
