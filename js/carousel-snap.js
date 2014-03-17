/**************************************************************
 *
 * Circular Carousel Ready for Lazy Loading 1.0
 *
 **************************************************************/

( function ( $ ) {
	'use strict';
	var CarouselSnap = function ( element, options ) {

		var settings          = $.extend( {}, $.fn.carouselSnap.defaults, options );
		var elementsToMove    = settings.elementsToMove;
		var container         = $( element );
		var currentPane       = 1;
		var widthPerItem      = container.children().outerWidth( true );
		var moveby            = '-=' + ( widthPerItem * elementsToMove ) + 'px';
		var movebyPrev        = '+=' + ( widthPerItem * elementsToMove ) + 'px';
		var parentHolderWidth = container.parent().outerWidth();
		var containerWidth    = container.children().length * container.children().outerWidth( true );

		var availableItems = container.children().length;;
		var availablePanes;

		var initializeSettings = function () {
			containerWidth = container.children().length * container.children().outerWidth( true );
			console.log( 'availableItems: ' + availableItems );
			availablePanes = Math.ceil( availableItems / elementsToMove );
		};

		var removeThenAppendElements = function ( shiftLeft ) {
			if ( shiftLeft ) {
				var lastItemLeftValue = container.children().last().position().left;
				for ( var i = 1; i <= settings.elementsToMove; i++ ) {
					var detachedItem = container.children().eq( 0 ).detach();
					container.append( detachedItem.css( 'left', lastItemLeftValue + widthPerItem * i ) );
				}
			} else {
				var firstItemLeftValue = container.children().first().position().left;
				for ( var i = 1; i <= settings.elementsToMove; i++ ) {
					var detachedItem = container.children().eq( availableItems - 1 ).detach();
					container.prepend( detachedItem.css( 'left', firstItemLeftValue - widthPerItem * i ) );
				}
			}
		}

		var shiftLeft = function ( updateCurrentPane ) {
			removeThenAppendElements( true );
			if ( updateCurrentPane ) {
				currentPane++;
			}
			container.children().animate( {
				'left': moveby
			} );
		}

		var shiftRight = function () {
			removeThenAppendElements( false );
			currentPane--;
			container.children().animate( {
				'left': movebyPrev
			} );
		}

		var listenToClick = function () {
			console.log( 'currentPane: ', currentPane );
			$( '#' + settings.nextID ).click( function () {
				shiftLeft( true );
				console.log( 'currentPane: ', currentPane );
			} )
			$( '#' + settings.prevID ).click( function () {
				shiftRight();
				console.log( 'currentPane: ', currentPane );
			} )
		}

		var alignCenter = function () {
			var nonvisibleItems = ( containerWidth - parentHolderWidth ) / widthPerItem;
			var itemsToShift    = Math.floor( nonvisibleItems / 2 );
			for (var i = 0; i < availableItems; i++) {
				var moveByItem = widthPerItem * ( i  - itemsToShift );
				container.children().eq( i ).css( 'left', moveByItem )
			}
		}

		var addStylesToItems = function () {
			container.children()
				.css( 'position', 'absolute' )
				.addClass( function( index ) {
					return 'carousel-snap-' + index;
				} );
			if ( settings.startOnCenter ) {
				alignCenter();
			}
		};

		var setContainerWidth = function () {
			container.css( 'width', containerWidth );
		}

		var appendPrevNextButtons = function () {
			container.after( '<div class="prevNext prevLink" id="' + settings.prevID + '">Previous</div><div class="prevNext nextLink" id="' + settings.nextID + '">Next</div>' );
		};

		var initialize = function () {
			appendPrevNextButtons();
			setContainerWidth();
			addStylesToItems();
			initializeSettings();
			listenToClick();
		};
		initialize();

	};

	$.fn.carouselSnap = function ( options ) {
		return this.each( function ( key, value ) {
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
		elementsToMove: 4,
		startOnCenter: true
	};

} )( jQuery );