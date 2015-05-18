(function(){
	'use strict';
	angular
		.module('app')
		.controller('LocCtrl', LocationController);

	function LocationController ($http, MarkerCreatorService) {
		var vm = this;
		vm.getPharmacies = function () {
			$http.post('/pharmacies', { lat: vm.latitude, long: vm.longitude})
				.success(function (pharmacies){
					//TODO: refactor into method
					for(var i = 0; i < pharmacies.length; i++) {
						var pharmacy = pharmacies[i];
						var message = 'Name: ' + pharmacy.Name + ' Address:' + pharmacy.Address1 + ', ' + pharmacy.PostCode + ' Tel:' + pharmacy.Tel;
						var pharmMaker = vm.createMarker(pharmacy.loc.coordinates[0], pharmacy.loc.coordinates[1], message);
						vm.map.markers.push(pharmMaker);
					}
				})
				.error(function (data) {
					alert('something went wrong'); //TODO: better error handling
				});
		}

		vm.createMarker = function (latitude, longitude, message){
			var tempMarker = null;
			MarkerCreatorService.createByCoords(latitude, longitude, message, function (marker){
				tempMarker = marker;
			});

			return tempMarker;
		}

		vm.drawMap = function (latitude, longitude, zoom) {
			if(!latitude || !longitude){
				latitude = 54.559322;
				longitude = -4.174804;
				zoom = 5;
			}
			vm.map = { 
				center:{ 
					latitude: latitude, 
					longitude: longitude 
				}, 
				zoom: zoom,
				markers: []
			};
		}

		vm.determineError = function(error){
            var errorMsg = 'Unable to determine user location';
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMsg = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMsg = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    errorMsg = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    errorMsg = "An unknown error occurred."
                    break;
            }
        }

        vm.getLocation = function(){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(vm.getPosition, vm.determineError);
            }else{
            	vm.drawMap(null, null, null);
            }
        }

        vm.getPosition = function(position){
            vm.lat = position.coords.latitude;
            vm.lon = position.coords.longitude;
            vm.drawMap(position.coords.latitude, position.coords.longitude, 5);
        }

        vm.getLocation();
		/*ioSocket.on('userLocation', function (latitude, longitude, statusMsg){

			vm.userMarker = vm.createMarker(latitude, longitude, 'User is here');
			vm.map.markers.push(vm.userMarker);
			vm.getPharmacies(vm.latitude, vm.longitude);
		});*/
	}
})();