'use strict';

$(document).ready(function () {
  $('.random-link').click(function () {
    return window.open('https://en.wikipedia.org/wiki/Special:Random');
  });
  var req = function req(textSearched) {
    var api = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srlimit=12&srprop=snippet&srsearch=';
    var apiReq = api + textSearched + '&callback=?';

    $.getJSON(apiReq, function (data) {
      var template = $('#responsetpl').html();
      var html = Mustache.to_html(template, data);
      $('.js-app').html(html);
      $('.content__item').children('.item__title').wrap(function () {
        return '<a href="https://en.wikipedia.org/wiki/' + $(this).text().replace(/\s/g, '_') + '" target=\'_blank\'></a>';
      });
    });
  };

  var myInput = $('#textSearched');
  // Use Observable with debounceTime to avoid querying the api on each key stroke
  var obs = Rx.Observable.fromEvent(myInput, 'keyup');

  obs.debounceTime(500).map(function (event) {
    return event.target.value;
  }).subscribe(function (value) {
    req(value);
  });
});