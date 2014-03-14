( function( $ ){

	// var colorArrays = [ 'black', 'red', 'green', 'blue' ];
	// var color = 0;
	// var totalItems = 40;
	// var loadPerFetch = 8;

	// var loadMoreElements = function( callback ) {
	// 	setTimeout( function() {
	// 		for ( var i = 1; i <= 8; i++) {
	// 			$('.vid-tab').append('<li class="dummy ' + colorArrays[ color ] + '"></li>');
	// 		};
	// 		if( color < colorArrays.length - 1 ) {
	// 			color++;
	// 		} else {
	// 			color = 0;
	// 		}
	// 		//totalItems = totalItems - loadPerFetch;
	// 		//loadPerFetch = ( totalItems < loadPerFetch ) ? totalItems : loadPerFetch;
	// 		callback( 1 );
	// 	}, 5000 );
	// }

	// $( '.vid-tab' ).carouselSnap( {
	// 	nextID: 'nextSlide',
	// 	prevID: 'previousSlide',
	// 	elementsToMove: 2,
	// 	fetchFunction: loadMoreElements,
	// 	loadPerFetch: loadPerFetch,
	// 	totalItems: totalItems
	// });

	$( '.vid-tab' ).carouselSnap();

})( jQuery );