/**
 * 
 */



angular.module('bookingApp').controller('bookingcontroller', ['$scope','instantBookingService', 'dropdownresponse',function($scope, instantBookingService, dropdownresponse){
	
		$scope.success = false;
		$scope.error = false;
		$scope.location = null;
		$scope.sports = null;
		$scope.event = {};
		$scope.priceDisplay = false;
		
		$scope.dropdownSuccessCallback = function(response){
			$scope.priceDisplay = false;
			if(response){
				dropdownresponse.setDropdown(response);
				$scope.event.location =  {'options' : dropdownresponse.getLocation()};
			}
		}
	
		$scope.dropdownFailureCallback = function(response){
			console.log("error ",response);
		}
		
		$scope.dropdown = instantBookingService.getDropDownData($scope.dropdownSuccessCallback, $scope.dropdownFailureCallback);
		
		$scope.loadSports = function(){
			$scope.priceDisplay = false;
			$scope.event.sports =  {'options' : dropdownresponse.getSports($scope.event.location.selected)};
		}
		
		$scope.loadSlots = function(){
			$scope.priceDisplay = false;
			$scope.event.slots =  {'options' : dropdownresponse.getSlots($scope.event.sports.selected)};
		}
		$scope.loadSlotsTime = function(){
			$scope.priceDisplay = false;
			$scope.event.time = {'options' : dropdownresponse.getSlotsTime($scope.event.slots.selected)};
		}
		$scope.loadSlotsPrice = function(){
			$scope.event.price = dropdownresponse.getSlotsPrice($scope.event.time.selected);
			$scope.priceDisplay = true;
		}
		$scope.saveNodeEventSuccessCallback = function(response){
			console.log('Success', response);			
			if(response && response.success){
				$scope.success = true;
				$scope.event={};
				$scope.message = response.success;
			}else if(response && response.error){
				$scope.message = response.error;
				$scope.error = true;
			}
		}
		$scope.saveNodeEventFailureCallback = function(response){
			console.log('Failure', response);
		}
		$scope.submitEvent = function(){
			console.log("Submit Event",$scope.event);
			console.log(instantBookingService.getSelectedDateByCalendarApp());
			instantBookingService.saveNodeEvent($scope.event, $scope.saveNodeEventSuccessCallback, $scope.saveNodeEventFailureCallback);
			
		}
		
		 $scope.$watch(function () {  
			 return instantBookingService.getSelectedDateByCalendarApp();
		 },
		 function(newVal, oldVal){
			 console.log(newVal);
			 $scope.selectedDate = newVal;
		 });
		
		
		
	
}]);

angular.bootstrap(document.getElementById("instantBooking"), ['bookingApp']);




