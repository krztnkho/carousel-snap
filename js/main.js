( function( $ ) {

	var colorArrays = [ 'black', 'red', 'green', 'blue' ];
	var color = 0;
	var loadMoreElements = function( callback ) {
		setTimeout( function() {
			for ( var i = 1; i <= 4; i++ ) {
				$( '.vid-tab' ).append( '<li class="dummy ' + colorArrays[ color ] + '"></li>' );
			}
			if ( color < colorArrays.length ) {
				color++;
			} else {
				color = 0;
			}
			callback( 1 );
		}, 500 );
	};

	$( '.vid-tab' ).carouselSnap( {
		nextID: 'nextSlide',
		prevID: 'previousSlide',
		elementsToMove: 1,
	//	fetchFunction: loadMoreElements,
		loadPerFetch: 4, //24
		totalItems: 8,
		time: 2000
	} );

} )( jQuery );
