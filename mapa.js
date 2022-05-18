async function initMap(){

  //var markers = [];

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
  /*var input = (document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  var searchBox = new google.maps.places.SearchBox((input));

  google.maps.event.addListener(searchBox, 'places_changed', function() {
  var places = searchBox.getPlaces();

  if (places.length == 0) {
    return;
  }
  for (var i = 0, marker; marker = markers[i]; i++) {
    marker.setMap(null);
  }

  // For each place, get the icon, place name, and location.
  markers = [];
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    // Create a marker for each place.
    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    markers.push(marker);
    marker.setPosition(input);
    marker.setCenter(input);

    bounds.extend(place.geometry.location);
  }

  map.fitBounds(bounds);
  });

  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

  google.maps.event.addDomListener(window, 'load', initMap);*/
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  //var markers = [];


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
                  infowindow.setContent("Nome: " + locations[i].eventos_name + "<br>Info: " + locations[i].eventos_info + "<br>Date: "+ locations[i].eventos_date + "<br>Start Time: "+  locations[i].eventos_starttime  + "<br>End Time: "+ locations[i].eventos_endtime );

                  infowindow.open(map, marker);
              }
          })(marker, i));
      }



  }

  getEventos();

  






  //Add embarcacoes


  const infowindowEmb = new google.maps.InfoWindow()

  const api_url3='https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/embarcacao'
  async function getEmbarcacoes(){
      const response=await fetch(api_url3);
      const embarcacoes =await response.json();





      console.log(embarcacoes);

      for (i = 0; i < embarcacoes.length; i++) {
          marker = new google.maps.Marker({
              position: new google.maps.LatLng(embarcacoes[i].lat, embarcacoes[i].long),
              map: map
          });

          marker.setIcon('../images/barco-a-vela.png')
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                  infowindowEmb.setContent("Nome: " + embarcacoes[i].embarcacao_name + "<br>Info: " + embarcacoes[i].embarcacao_info + "<br>Nome do propietário: "+ embarcacoes[i].utilizador_name );

                  infowindowEmb.open(map, marker);
              }
          })(marker, i));
      }



  }

  getEmbarcacoes();

  // Add a polygon

  const api_url='https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/cais'
  async function getCais(){
      const response=await fetch(api_url);
      const cais=await response.json();



      for (i = 0; i < cais.length; i++) {
          var ParseCais = JSON.parse(cais[i].geojson)
          console.log(ParseCais.coordinates)
          console.log(cais[i].cais_name)
          var nomeCais = cais[i].cais_name;
          var infoCais = cais[i].cais_info;
          var idCais = cais[i].cais_id;
          const getNumberOfEmbarcacoesInPolygon_url = 'https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/embarcacao/intersection/number/' + JSON.stringify(idCais)
                    let data
                    !await async function () {
                        data = await fetch(getNumberOfEmbarcacoesInPolygon_url)
                            .then(response => response.json())
                            .catch(err => {
                                console.error('Request failed', err)
                            })
                            .then(data => {
                                return data.count;
                                //console.log(data);
                            });
                        console.log(data)
                    }();


                    var bic = data;
                    var color= 0;
                    var bounds = new google.maps.LatLngBounds();
                    for (var y = 0; y < cais.length; y++) {
                        var shell = ParseCais.coordinates[y];
                        var latLngArray = [];
                        var length = Object.keys(shell).length;

                        console.log(length);
                        for (var i = 0; i < shell.length; i++) {
                            console.log("Latitude: " + shell[i][0]);
                            console.log("Longitude: "+ shell[i][1]);
                            var pt = new google.maps.LatLng(shell[i][0], shell[i][1]);
                            bounds.extend(pt);
                            latLngArray.push(pt);

                        }

                        if(bic <= 5){
                            color = '#008000'
                        }else if(bic > 5 && bic <= 20){
                            color = '#FFFF00'
                        }else{
                            color = '#FF0000'
                        }

                        console.log(latLngArray);
                        // Polygon construction.
                        var ttPoly = new google.maps.Polygon({
                            paths: latLngArray,
                            strokeColor: color,
                            strokeOpacity: 0.2,
                            strokeWeight: 2,
                            fillColor: color,
                            fillOpacity: 0.2
                        });
                        ttPoly.setMap(map);

                        google.maps.event.addListener(ttPoly, 'click', function(event) {
                            var contentString = "Nome: " + nomeCais + "<br>Info: " + infoCais + "<br>Nº de barcos: " + bic;
                            infowindow.setContent(contentString);
                            infowindow.setPosition(event.latLng);
                            infowindow.open(map);
                        });
                    }
                }
      map.fitBounds(bounds);

  }
  getCais();




  //Geolocation
  //Geolocation
  //Geolocation
  //Geolocation

  const infoWindoGeolocation = new google.maps.InfoWindow()

  const locationButton = document.getElementById('button');

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

    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    document.getElementById("btn").addEventListener("click", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer)
    });


  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
          browserHasGeolocation
              ? "Error: The Geolocation service failed."
              : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map)
  }

  

window.map = map;

  //GEo Coding search bar

  var input = document.getElementById('pac-input');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow1 = new google.maps.InfoWindow();
    var marker1 = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener ('place_changed', function() {
      infowindow1.close();
      marker1.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
      } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
      }
      marker1.setIcon(({
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(35, 35)
      }));
      marker1.setPosition(place.geometry.location);
      marker1.setVisible(true);

      var address = '';
      if (place.address_components) {
          address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
      }

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
      infowindow.open(map, marker1);

      // Location details
      for (var i = 0; i < place.address_components.length; i++) {
          if(place.address_components[i].types[0] == 'postal_code'){
              document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
          }
          if(place.address_components[i].types[0] == 'country'){
              document.getElementById('country').innerHTML = place.address_components[i].long_name;
          }
      }
  });

  function calculateAndDisplayRoute(directionsService, directionsRenderer){
    const selectedMode = document.getElementById("mode").value

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        },
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow1, map.getCenter());
    }


    directionsService
    .route({
        destination: autocomplete,

        travelMode: google.maps.TravelMode[selectedMode],
    })

    .then((response) => {
        directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Direction request failed due to" + status));

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


