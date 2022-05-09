async function initMap() {
    //Map options
    let mapOptions = {
        center: new google.maps.LatLng('38.654077198334306', '-8.99502557883541'),
        zoom: 17,
        mapTypeId: 'roadmap',
        mapTypeControlOptions:{
            mapTypeIds:[]
        },
        mapId: 'f7dc6b907125f67f'

    }
    //link map options to actual map
    let map = new google.maps.Map(document.getElementById('map'), mapOptions);


    const infowindow = new google.maps.InfoWindow()

    const api_url2='https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/eventos'
    async function getEventos(){
        const response=await fetch(api_url2);
        const locations=await response.json();

        console.log(locations);

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i].eventos_local.x, locations[i].eventos_local.y),
                map: map
            });

            marker.setIcon('../images/EventoMarker.png')
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(locations[i].eventos_name);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }



    }

    getEventos();
    //GEo Coding search bar
    /*var input =document.getElementById('searchInput');
    map.controls[google.maps.ControlPosition.TOP_LEFT]-push(input)

    var infowindow = new google.maps.Infowindow();
    var marker = new google.maps.Marker ({
        map: map,
        anchorPoint: new google.maps. Point (0, -29)
    });



    autocomplete.addListener ('place_changed', function() {
        infowindow.close();
        marker.setvisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.aler("Autcomplete's returned place contains no geometry");
            return;
        }
        // If the place hasageometry, then present it onamap.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledsize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setvisible(true);

        var address = '';
        if (place.address_components){
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setcontent ('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open (map, marker);
    });*/


    // Add a polygon

    const api_url='https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/cais'
            async function getCais(){
                const response=await fetch(api_url);
                const cais=await response.json();

                for (i = 0; i < cais.length; i++) {
                    var ParseCais = JSON.parse(cais[i].geojson)
                    console.log(ParseCais.coordinates)
                }

                var bounds = new google.maps.LatLngBounds();
                for (var y = 0; y < cais.length; y++) {
                    var shell = ParseCais.coordinates[y];
                    var latLngArray = [];
                    var length = Object.keys(shell).length;
                    console.log(length);
                    for (var i = 0; i < shell.length; i++) {
                        console.log("Latitude: " + shell[i][0]);
                        console.log("Longitude: "+ shell[i][1]);
                        var latLng = new google.maps.LatLng(shell[i][0], shell[i][1]);
                        bounds.extend(latLng);
                        console.log(bounds);
                        latLngArray.push(latLng);
                        console.log(latLngArray)
                    }

                    console.log(latLngArray);
                    // Polygon construction.
                    var ttPoly = new google.maps.Polygon({
                        paths: latLngArray,
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.2,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.2
                    });
                    ttPoly.setMap(map);
                }
                map.fitBounds(bounds);

            }
            getCais();

    //Geolocation
    //Geolocation
    //Geolocation
    //Geolocation

    const infoWindoGeolocation = new google.maps.InfoWindow()

    const locationButton = document.createElement("button");

    locationButton.textContent = "Current location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    markerGeolocation = new google.maps.Marker({
                        position: new google.maps.LatLng(pos.lat, pos.lng),
                        map: map
                    });

                    markerGeolocation.setIcon('../images/location.png')
                    google.maps.event.addListener(markerGeolocation, 'click', (function(marker) {
                        return function() {
                            infowindow.setContent("Você está aqui");
                            infowindow.open(map, marker);
                        }
                    })(markerGeolocation));
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindoGeolocation, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindoGeolocation, map.getCenter());
        }
    });


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
        );
    }
    //Add a marker
    //Add a marker
    //Add a marker
    //Add a marker


    /*let markerOptions = {
        position: new google.maps.LatLng(38.654205708390336, -8.994321577976788),
        title: 'Evento Marinha do Tejo',
        optimized: true,
        animation: google.maps.Animation.BOUNCE,
        content:'<h1>asdasdasdasdasdasasd</h1>'


    }


    let marker1 = new google.maps.Marker(markerOptions)

    marker1.setIcon('../images/EventoMarker.png')
    //marker1.setLabel('Evento Marinha do Tejo')

    //Info Window Options

    const infoWindowOptions= {
        content: 'Evento da Marinha do Tejo',
        position: {lat: 38.654205708390336, lng: -8.994321577976788 }
    }
    const infoWindow = new google.maps.InfoWindow(infoWindowOptions)

    const infoWindowOpenOptions = {
        map: map,
        anchor: marker1,
        shouldFocus: false,
        maxWidth: 200
    }
    infoWindow.open(infoWindowOpenOptions);

    infoWindow.setPosition({lat: 38.654205708390336, lng: -8.994321577976788 })






    marker1.addListener('click', (googleMapsEvent)=>{
        document.getElementById('info').innerHTML = 'latitude:' + googleMapsEvent.latLng.lat()  + ' longitude:' + googleMapsEvent.latLng.lng()
    }, 5000)

    marker1.setMap(map);
    document.getElementById('info2').innerHTML = marker1.getAnimation();

    setTimeout(()=>{
        marker1.setAnimation(null);
        document.getElementById('info2').innerHTML = marker1.getAnimation();
    }, 5000)
*/


    /*map.setTilt(45);*/

    /*delete marker after 3 seconds

    setTimeout(()=> {
        marker.setMap(null);
    }, 3000);*/


    //document.getElementById('info').innerHTML = "MAPA Teste";


}
