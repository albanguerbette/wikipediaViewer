$(document).ready(function () {
  var req = function (textSearched) {
    var api = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srlimit=12&srprop=snippet&srsearch='
    var apiReq = api + textSearched + '&callback=?'

    $.getJSON(apiReq, function (data) {
      var template = $('#responsetpl').html()
      var html = Mustache.to_html(template, data)
      $('.js-app').html(html)
      $('.content__item').children('.item__title').wrap(function () {
        return '<a href="https://en.wikipedia.org/wiki/' + $(this).text().replace(/\s/g, '_') + '"></a>'
      })
    })
  }

  $('#textSearched').on('input', function (e) {
    e.preventDefault()
    var inputText = $('#textSearched').val()
    req(inputText)
  })
})
