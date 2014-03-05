( function( $ ){

	var colorArrays = [ 'black', 'red', 'green', 'blue' ];
	var color = 0;
	var loadMoreElements = function( callback ) {
		setTimeout( function() {
			for (var i = 1; i <= 6; i++) {
				$('.vid-tab').append('<li class="dummy ' + colorArrays[ color ] + '"></li>');
			};
			if( color < colorArrays.length ) {
				color++;
			} else {
				color = 0;
			}
			callback( 1 );
		}, 3000);
	}

	$('.vid-tab').carouselSnap({
		nextID: 'nextSlide',
		prevID: 'previousSlide',
		elementsToMove: 3,
		fetchFunction: loadMoreElements,
		loadPerFetch: 6,
		totalItems: 36
	});
})( jQuery );