$(document).ready(function () {
  var req = function (textSearched) {
    var api = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srlimit=12&srprop=snippet&srsearch='
    var apiReq = api + textSearched + '&callback=?'

    $.getJSON(apiReq, function (data) {
      var template = $('#responsetpl').html()
      var html = Mustache.to_html(template, data)
      $('.js-app').html(html)
    })
  }

  $('#textSearched').on('input', function (e) {
    e.preventDefault()
    var inputText = $('#textSearched').val()
    req(inputText)
  })
})
