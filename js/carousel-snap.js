/**************************************************************
 *
 * Carousel Snap 1.0
 * by Jes Anub
 *
 **************************************************************/

( function( $ ) {
	var CarouselSnap = function( element, options ) {
		var settings = $.extend( {}, $.fn.carouselSnap.defaults, options );

	};

	$.fn.carouselSnap = function( options ) {
		return this.each( function( key, value ) {
			var element = $( this );
			if ( element.data( 'carouselSnap' ) ) {
				return element.data( 'carouselSnap' );
			}
			var carouselSnap = new CarouselSnap( this, options );
			element.data( 'carouselSnap', carouselSnap );
		} );
	};

	$.fn.carouselSnap.defaults = {

	};

} )( jQuery );