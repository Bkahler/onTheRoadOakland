$(window).load(function(){
	// for isotope call and to allow see all page to appear
	// on pageload check to see if map div is on current page
	// if so initialize map into #map div
	if($('#map').length > 0){
		initialize_map();
	}
});


function initialize_map(event){

	var mq = window.matchMedia( '(min-width: 767px)' ); // Javascript media query

	if (mq.matches){
		var	map = new L.mapbox.map('map', 'panicbus.23p6efg5').setView([37.810661, -122.270213], 15); //set map center for desktop size
	} else {
		var	map = new L.mapbox.map('map', 'panicbus.23p6efg5').setView([37.810661, -122.270213], 14); //set map center for mobile size
	};

	// var stamenLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {attribution: 'Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under <a href='http://creativecommons.org/licenses/by-sa/3.0'>CC BY SA</a>.'}).addTo(map);


	// adds the GeoJson to the map layer from route.js
	map.featureLayer.setGeoJSON(geoJson_features);

	// this is the marker click listener
	map.featureLayer.on('click',function(e) {
		$.get('/checkins/' + e.layer.feature.properties.location_id); // fyi this used to have another ,e.layer.etc
		// fills the mobile view with class for content_div
		$('.content_div').css('display','block').animate({height:'100%'}, 1000);
		$('#back_button').fadeIn();
	});

	// map.featureLayer.trigger(marker, 'click');


	$('body').on('click', '#back_button', function(){
		$('.content_div').slideUp();
		$('#back_button').fadeOut();
		map.featureLayer.eachLayer(function(marker) {
			// if (marker.feature.properties.description === 'Great Wall of Oakland') {
        marker.openPopup();
      // }
    });
	})

	$('body').on('click', '#submit_button', function(){
		setTimeout(function(){
			$('.notice').slideUp('slow')
		},3000);
	});


	$('.splash').on('click', function(){
		// show the marker info window immediately
		map.featureLayer.eachLayer(function(marker) {
			if (marker.feature.properties.description === 'Great Wall of Oakland') {
        marker.openPopup();
      }
    });
		$('.splash').fadeOut(500);
	})

};
