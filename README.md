Circular Carousel Snap
======================

A jQuery circular carousel plugin ready for lazy loading functionality.

### Demo

http://iammary.github.io/carousel-snap/

### How to use

1. Identify the container of the items

	```HTML
	<ul id="carousel">
		<li> 1 </li>
		<li> ... </li>
	</ul>
	```

2. Invoke the carouselSnap() function

	```JavaScript
	$( '#carousel' ).carouselSnap();
	```

### Additional Settings

Below is an example of the code with all available options and their defaults:

```JavaScript
$( '#carousel' ).carouselSnap({
		nextID: 'next-slide',
		prevID: 'previous-slide',
		elementsToMove: 4,
		startOnCenter: true
});
```

### Code Reference

Checkout development branch at https://github.com/iammary/carousel-snap/tree/dev

