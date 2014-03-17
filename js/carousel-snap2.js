/**************************************************************
 *
 * Carousel Snap 1.0
 *
 **************************************************************/

( function( $ ) {
	var CarouselSnap = function( element, options ) {

		var settings = $.extend( {}, $.fn.carouselSnap.defaults, options );

		var currentPane = 1;
		var fetchOnThisPane = 1;
		var domReady = true;
		var container = $( element );
		var visibleItems = settings.elementsToMove;
		var currentLeftValue;
		var holdOnThisPane;

		var itemLength;
		var containerLength;
		var currentTotalPanes;
		var availablePanes;
		var totalPanes;
		var timeoutId; //variable for checkHover
		var firstElement = 1;
		var lastElement = 4; //pointer to an element

		var moveby = '-=' + ( container.children().outerWidth( true ) * visibleItems ) + 'px';
		var movebyPrev = '+=' + ( container.children().outerWidth( true ) * visibleItems ) + 'px';

		var setContainerWidth = function() {
			containerLength = container.children().length * container.children().outerWidth( true );
			container.css( 'width', containerLength );
		};
		var appendPrevNextButtons = function() {
			container.after( '<div class="prevNext prevLink" id="' + settings.prevID + '">Previous</div><div class="prevNext nextLink" id="' + settings.nextID + '">Next</div>' );
		};

		var initializeSettings = function() {
			itemLength = container.children().length;
			availablePanes = Math.ceil( itemLength / visibleItems );
			currentTotalPanes = availablePanes;
			totalPanes = Math.ceil( ( settings.totalItems / visibleItems ) );
		};


		var isGroupsFirstPane = function() {
			return ( ( currentTotalPanes < totalPanes ) && ( fetchOnThisPane == currentPane ) ) ? true : false;
		};

		var fetchOnGroupsFirstPane = function() {
			getLeft();
			domReady = false;
			settings.fetchFunction( function( domCheck ) {
				domReady = domCheck;
				firstElement += settings.elementsToMove;
				lastElement += settings.elementsToMove;
				fetchOnThisPane = currentTotalPanes + 1;
				setContainerWidth();
				holdOnThisPane = currentTotalPanes;
				initializeSettings();
				setLeft();
				animateLeft();
			} );
		};

		var getLeft = function() {
			currentLeftValue = container.children().css( 'left' );
		};

		var setLeft = function() {
			container.children().css( 'left', currentLeftValue );
		};

		var fetchOnLastGroupsFromFirstPane = function() {
			fetchOnThisPane = settings.totalPanes;
			setContainerWidth();
			holdOnThisPane = currentTotalPanes;
			initializeSettings();
			setLeft();
			moveRight();
		};

		var changeChildrensLeftAtrribute = function( next, current, options, done ) {
			var count;
			var len;
			var flag = options.extra + ( settings.elementsToMove - 1 );
			var dist = 0;
			if ( next === true ) {
				if ( options.left !== 0 ) {
					for ( count = 0; count < flag; count++ ) {
						current[ 0 ].children[ count ].setAttribute( 'style', 'left: ' + options.left + 'px' );
					}
				} else if ( firstElement === 1 ) {
					len = current[ 0 ].children.length;
					for ( count = 0; count < len; count++ ) {
						current[ 0 ].children[ count ].setAttribute( 'style', 'left:' + ( container.children().outerWidth( true ) * settings.elementsToMove ) + 'px' );
					}
				} else {
					dist = firstElement - 1;
					len = current[ 0 ].children.length;
					for ( count = 0; count < len; count++ ) {
						current[ 0 ].children[ count ].setAttribute( 'style', 'left:' + ( ( container.children().outerWidth( true ) * -dist ) + ( container.children().outerWidth( true ) * settings.elementsToMove ) ) + 'px' );
					}

				}
			} else if ( next === false ) {
				len = current[ 0 ].children.length;
				dist = (options.left - containerLength);
				if ( firstElement !== 1 ) {
					for ( count = len - 1; count >= lastElement; count-- ) {
						current[ 0 ].children[ count ].setAttribute( 'style', 'left: -' + options.left + 'px' );
					}
					if ( options.extra === 0 && (options.left !== dist )) {
						for ( count = 0; count < len; count++ ) {
							current[ 0 ].children[ count ].setAttribute( 'style', 'left: ' + -dist+ 'px' );
						}
					}
				} else {
					for ( count = 0; count < len; count++ ) {
						current[ 0 ].children[ count ].setAttribute( 'style', 'left: -' + ( container.children().outerWidth( true ) * settings.elementsToMove ) + 'px' );
					}
				}
			}
			done();
		};

		var updateAndCheckLastElement = function( next, done ) {
			var distance;
			var flag = 4 + settings.elementsToMove;
			var extra = 0;
			if ( next === true ) {
				updatePointers( true );
				distance = lastElement - firstElement;

				if ( distance < 0 ) {
					done( {
						'extra': lastElement,
						'left': container.children().outerWidth( true ) * ( flag - lastElement )
					} );
				} else {
					done( {
						'extra': 0,
						'left': 0
					} );
				}
			} else {
				updatePointers( false );
				distance = 4 - settings.elementsToMove;
				extra = ( firstElement > lastElement ) ? lastElement : 0;
				if ( firstElement !== 0 ) {
					done( {
						'extra': extra,
						'left': container.children().outerWidth( true ) * ( settings.totalItems - ( distance - lastElement ) )
					} );
				} else {
					done( {
						'extra': 0,
						'left': 0
					} );
				}

			}
		};
		var updatePointers = function( flag ) {
			var dist, dist2;
			if ( flag === false ) {
				dist = firstElement - ( settings.elementsToMove );
				firstElement = ( dist <= 0 ) ? ( settings.totalItems + dist ) : dist;

				dist2 = lastElement - ( settings.elementsToMove );
				lastElement = ( dist2 <= 0 ) ? ( settings.totalItems + dist2 ) : dist2;
			} else {
				firstElement = Math.abs( firstElement + ( settings.elementsToMove ) ) % settings.totalItems;
				firstElement = ( firstElement === 0 ? settings.totalItems : firstElement );

				lastElement = Math.abs( lastElement + ( settings.elementsToMove ) ) % settings.totalItems;
				lastElement = ( lastElement === 0 ? settings.totalItems : lastElement );
			}
		};
		//************************************************************

		//editted
		var animateLeft = function() {
			currentPane++;
			updateAndCheckLastElement( true, function( res ) {
				changeChildrensLeftAtrribute( true, $( element.tagName + '.' + element.className ), {
					'left': res.left,
					'extra': res.extra
				}, function() {
					container.children().animate( {
						'left': moveby
					} );
				} );

			} );
		};

		var moveLeft = function() {
			if ( ( ( currentPane < currentTotalPanes ) && ( holdOnThisPane != currentPane ) ) || ( ( holdOnThisPane == currentPane ) && domReady ) ) {
				if ( isGroupsFirstPane() ) {
					fetchOnGroupsFirstPane();
				} else {
					animateLeft();
				}
			} else if ( currentPane === currentTotalPanes ) { //added
				currentPane = 0;
				animateLeft();
			}
		};

		var animateRight = function() {
			currentPane--;
			updateAndCheckLastElement( false, function( res ) {
				changeChildrensLeftAtrribute( false, $( element.tagName + '.' + element.className ), {
					'left': res.left,
					'extra': res.extra
				}, function() {
					container.children().animate( {
						'left': movebyPrev
					} );
				} );
			} );
		};

		var moveRight = function() {
			if ( isGroupsFirstPane() ) {
				fetchOnLastGroupsFromFirstPane();
				currentPane = totalPanes;
			} else if ( currentPane === 1 ) {
				currentPane = totalPanes;
				animateRight();
			} else {
				animateRight();
			}
		};


		var initialize = function() {
			appendPrevNextButtons();
			setContainerWidth();
			initializeSettings();
			listenToHover();
		};



		/*****************************************************************************
		 * function to get time on how long did the user hover on the element.
		 * To use
		 * checkHover( '#theelement' , function( hoverTime){
		 *   code to do with the time;
		 * } )
		 * @param  html element The element to check.
		 * @param  function callback  Called when function is done.
		 * @return Object hoverTime The time it is hovering on the element in seconds.
		 ******************************************************************************/
		var checkHover = function( element, callback ) {
			$( element ).hover( function() {
				//start time
				if ( !timeoutId ) {
					timeoutId = window.setInterval( function() {
						callback();
					}, settings.time );
				}
			}, function() {
				//reset time
				if ( timeoutId ) {
					window.clearInterval( timeoutId );
					timeoutId = null;
				}
			} );
		};
		var listenToHover = function() {
			checkHover( '#' + settings.nextID, function() {
				moveLeft();
			} );
			checkHover( '#' + settings.prevID, function() {
				moveRight();
			} );
		};
		//**************************************************************
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

	$.fn.setTotalItems = function ( value ) {
		$.fn.carouselSnap.defaults.totalItems = value;
	};

	$.fn.getTotalItems = function ( ) {
		return $.fn.carouselSnap.defaults.totalItems;
	};

	$.fn.carouselSnap.defaults = {
		nextID: 'next-slide',
		prevID: 'previous-slide',
		elementsToMove: 3,
		time: 1000,
		loadPerFetch: 10,
		fetchFunction: function( callback ) {
			callback( true );
		},
		totalItems: 60,

	};

} )( jQuery );