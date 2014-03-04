/**************************************************************
 *
 * Carousel Snap 1.0
 *
 **************************************************************/

( function( $ ) {
	var CarouselSnap = function( element, options ) {
		var settings = $.extend( {}, $.fn.carouselSnap.defaults, options );
		var container = $( element );
		var containerLength = container.children().length * container.children().outerWidth( true );
		var setContainerWidth = function() {
			container.css( 'width', containerLength );
		};
		var appendPrevNextButtons = function () {
			container.after('<div class="prevNext prevLink" id="' + settings.prevID + '">Previous</div><div class="prevNext nextLink" id="' + settings.nextID + '">Next</div>');
		}
		var initialize = function () {
			appendPrevNextButtons();
			setContainerWidth();
		}

		initialize();

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
		nextID: 'next-slide',
		prevID: 'previous-slide'
	};

} )( jQuery );