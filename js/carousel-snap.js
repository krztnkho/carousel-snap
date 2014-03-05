/**************************************************************
 *
 * Carousel Snap 1.0
 *
 **************************************************************/

( function( $ ) {
	var CarouselSnap = function( element, options ) {

		var settings = $.extend( {}, $.fn.carouselSnap.defaults, options );
		var currentIndex = 0;
		var container = $( element );
		var itemLength;
		var visibleItems = settings.elementsToMove;
		var remainingPanes;
		var moveby = '-=' + ( container.children().outerWidth( true ) * visibleItems ) + 'px';
		var movebyPrev = '+=' + ( container.children().outerWidth( true ) * visibleItems ) + 'px';

		var containerLength = container.children().length * container.children().outerWidth( true );

		var setContainerWidth = function() {
			container.css( 'width', containerLength );
		};

		var appendPrevNextButtons = function () {
			container.after('<div class="prevNext prevLink" id="' + settings.prevID + '">Previous</div><div class="prevNext nextLink" id="' + settings.nextID + '">Next</div>');
		}

		var initializeSettings = function () {
			itemLength = 	container.children().length;
			console.log( 'itemLength ' + itemLength );
			container.children().css('left', 'auto');
			currentIndex = 0;
			remainingPanes = ( itemLength / visibleItems ) - 1;
		}

		var listenToClick = function () {
			$( '#' + settings.nextID ).click( function() {
				if(currentIndex < remainingPanes ){
					console.log( 'here' );
					console.log(	'currentIndex next' + currentIndex );
					console.log( 'remainingPanes ' + remainingPanes );
					currentIndex++;
					container.children().animate( { 'left': moveby } );
	      }
			})
			$( '#' + settings.prevID ).click( function() {
				if( currentIndex > 0 ){
	        currentIndex--;
	        console.log( 'currentIndex' + currentIndex );
	        container.children().animate( { 'left': movebyPrev } );
	      }
			})
		}

		var initialize = function () {
			appendPrevNextButtons();
			setContainerWidth();
			initializeSettings();
			listenToClick();
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
		prevID: 'previous-slide',
		elementsToMove: 3
	};

} )( jQuery );