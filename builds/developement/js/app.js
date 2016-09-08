$( document ).ready( function() {

	var req = function( textSearched ) {
		var api = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srlimit=10&srprop=snippet&srsearch=';
		var apiReq = api + textSearched + '&callback=?';
		$.getJSON(apiReq, function( data ) {
			setHtml( data );
		});
	};

	var setHtml = function ( data ) {
		var html = '';
		for ( var i = 0; i < 10; i++ ) {
			html += '<li><h1 class="uppercase">' + data.query.search[i].title + '</h1>';
			html += '<p>' + data.query.search[i].snippet + '</p></li>';
		}
		$('ul').append(html);
	};


	$( '#query' ).on( 'input', function(e) {
		e.preventDefault();
		$( 'ul' ).html( '' );
		var inputText = $( '#query' ).val();
		req( inputText );
	});

});
