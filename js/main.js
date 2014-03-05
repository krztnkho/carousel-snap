( function( $ ){

	var colorArrays = [ 'black', 'red', 'green', 'blue' ];
	var color = 0;
	var loadMoreElements = function( callback ) {
		for (var i = 1; i <= 4; i++) {
			$('.vid-tab').append('<li class="dummy ' + colorArrays[ color ] + '"></li>');
		};
		if( color < colorArrays.length ) {
			color++;
		} else {
			color = 0;
		}
		callback( 1 );
	}

	$('.vid-tab').carouselSnap({
		nextID: 'nextSlide',
		prevID: 'previousSlide',
		elementsToMove: 4,
		onFirstScroll: loadMoreElements,
		loadPerFetch: 8,
		totalItems: 12
	});
})( jQuery );