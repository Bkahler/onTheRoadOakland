$(window).load(function(){
	// for isotope call and to allow see all page to appear
	// on pageload check to see if map div is on current page
	// if so initialize map into #map div
	if($('#map').length > 0){
		initialize_map();
	}
});


function initialize_map(event){

	mapboxgl.accessToken = 'pk.eyJ1IjoicGFuaWNidXMiLCJhIjoiS1l5dkdoYyJ9.l3sODWuJFbsCxrVUAe3K0Q'
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/light-v9',
		center: [-122.267548, 37.811635],
		pitch: 150, // pitch
		bearing: -40, // bearing
		zoom: 9
	});


	// geojson defined in route.js //
	////////////////////////////////

	geojson.features.forEach(function(marker) {
		// create a DOM element for the marker
		var el = document.createElement('div');
		el.className = 'marker';
		el.style.backgroundImage = 'url(../assets/projector2-128.png)';
		el.style.width = marker.properties.iconSize[0] + 'px';
		el.style.height = marker.properties.iconSize[1] + 'px';

		el.addEventListener('click', function() {
			$.get('/checkins/' + marker.properties.location_id);
			$('.content_div').css('display','block').animate({height:'100%'}, 1000);
			$('#back_button').fadeIn();
		});

		// add marker to map
		new mapboxgl.Marker(el, {offset: [-marker.properties.iconSize[0] / 2, -marker.properties.iconSize[1] / 2]})
			.setLngLat(marker.geometry.coordinates)
			.addTo(map);

		// // var myMarker = new mapboxgl.Marker([el.style.width, el.style.height], { /* Options */ });
		// map.on('zoomend', function() {
		// 	var currentZoom = map.getZoom();
		// 	marker.setRadius(currentZoom);
		// });

	});


	// marker's secondary properties
	map.on('load', function(){
		map.addSource('points', {
			'type': 'geojson',
			'data': {
				'type': 'FeatureCollection',
				'features': [{
					'type': 'Feature',
					'geometry': {
						'type': 'Point',
						'coordinates': [-122.267548, 37.811635]
					},
					'properties': {
						'title': 'Great Wall of Oakland'
					}
				}]
			}
		});

		map.addLayer({
			'id': 'points',
			'type': 'symbol',
			'source': 'points',
			'layout': {
				'text-field': '{title}',
				'text-font': ['Mark Offc Pro Regular', 'Open Sans Semibold'],
				'text-size': 22,
				'text-letter-spacing': 0.2,
				'text-offset': [0, -1.8],
				'text-anchor': 'bottom'
			}
		});
	});

	// flyTo coords
	var theWall = {
		bearing: 27,
		center: [-122.267548, 37.811635],
		zoom: 17,
		pitch: 20
	}

	$('.splash').on('click', function(){
		// fly the fuck to it!
		map.flyTo(theWall);
		$('.splash').fadeOut(500);
	});

	// close the mobile collaple menu when clicking off it
	$('body').on('click', function(){
		$('.navbar-collapse').collapse('hide');
	})


	$('body').on('click', '#back_button', function(){
		$('.content_div').slideUp();
		$('#back_button').fadeOut();
	})

	$('body').on('click', '#submit_button', function(){
		setTimeout(function(){
			$('.notice').slideUp('slow')
		},3000);
	});

};
