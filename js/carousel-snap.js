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
		var widthPerItem      = container.children().outerWidth( true );
		var moveby            = '-=' + ( widthPerItem * elementsToMove ) + 'px';
		var movebyPrev        = '+=' + ( widthPerItem * elementsToMove ) + 'px';
		var parentHolderWidth = container.parent().outerWidth();
		var containerWidth    = container.children().length * container.children().outerWidth( true );
		var availableItems    = container.children().length;
		var countAnimate      = 1;
		var availablePanes;

		var initializeSettings = function () {
			containerWidth = container.children().length * container.children().outerWidth( true );
			availablePanes = Math.ceil( availableItems / elementsToMove );
		};

		var appendItems = function ( shiftedToLeft ) {

			if ( shiftedToLeft ) {
				var lastItemLeftValue = container.children().last().position().left;
				for ( var i = 1; i <= settings.elementsToMove; i++ ) {
					var clonedItem = container.children().eq( i - 1 ).clone();
					container.append( clonedItem.css( 'left', lastItemLeftValue + widthPerItem * i ) );
				}


			} else {
				var firstItemLeftValue = container.children().first().position().left;
				for ( var i = 1; i <= settings.elementsToMove; i++ ) {
					var clonedItem = container.children().eq( availableItems - 1 ).clone();
					container.prepend( clonedItem.css( 'left', firstItemLeftValue - widthPerItem * i ) );
				}
			}
		}

		var removeTempItems = function ( shiftedToLeft ) {
			if ( countAnimate == ( availableItems + settings.elementsToMove ) ) {
				countAnimate = 1;
				listenToClick();
				if ( shiftedToLeft ) {
					for ( var i = 1; i <= settings.elementsToMove; i++ ) {
						container.children().first().remove();
					}
				} else {
					for ( var i = 1; i <= settings.elementsToMove; i++ ) {
						container.children().last().remove();
					}
				}
			} else {
				countAnimate++;
			}
		}

		var shiftLeft = function () {
			appendItems( true );
			container.children().animate( {
				'left': moveby
			}, {
					'start'    : unbindListenToClick,
					'complete' : function () {
						removeTempItems( true )
					}
			} );
		}

		var shiftRight = function () {
			appendItems( false );
			container.children().animate( {
				'left': movebyPrev
			}, {
					'start'    : unbindListenToClick,
					'complete' : function () {
						removeTempItems( false );
					}
			} );
		}

		var unbindListenToClick = function () {
			console.log( 'unbind' );
			$( '#' + settings.nextID ).off( 'click', shiftLeft);
			$( '#' + settings.prevID ).off( 'click', shiftRight);
		}

		var listenToClick = function () {
			console.log( 'bind' );
			$( '#' + settings.nextID ).on( 'click', shiftLeft);
			$( '#' + settings.prevID ).on( 'click', shiftRight);
		}

		var alignCenter = function ( alignFlag ) {
			var nonvisibleItems = ( containerWidth - parentHolderWidth ) / widthPerItem;
			var itemsToShift;
			if ( alignFlag ) {
				itemsToShift = Math.floor( nonvisibleItems / 2 );
			} else {
				itemsToShift = 0;
			}
			for (var i = 0; i < availableItems; i++) {
				var moveByItem = widthPerItem * ( i  - itemsToShift );
				container.children().eq( i ).css( 'left', moveByItem )
			}
		}

		var hidePrevNextLink = function () {
			container.parent().find('.prevNext').hide();
		}

		var checkItemsTotal = function () {
			if ( availableItems <= settings.elementsToMove ) {
				hidePrevNextLink();
				alignCenter( false );
			} else {
				alignCenter( true );
				listenToClick();
			}
		}

		var addStylesToItems = function () {
			container.children()
				.css( 'position', 'absolute' )
				.addClass( function( index ) {
					return 'carousel-snap-' + index;
				} );
				checkItemsTotal();
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